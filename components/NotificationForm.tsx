import * as Notifications from 'expo-notifications';
import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, FlatList, Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { loadReminders, saveReminders, Reminder } from '../hooks/useStorage';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: false,
    shouldShowList: false,
  }),
});

export default function NotificationForm() {
  const [message, setMessage] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [pickerVisible, setPickerVisible] = useState(false);
  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    (async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        const { status: newStatus } = await Notifications.requestPermissionsAsync();
        if (newStatus !== 'granted') {
          Alert.alert('Permission required to show notifications');
        }
      }
      const r = await loadReminders();
      setReminders(r || []);
    })();
  }, []);

  const scheduleNotification = async () => {
    if (!message.trim()) return Alert.alert('Please enter a message');
    if (date <= new Date()) return Alert.alert('Please pick a future date/time');

    try {
      // make sure date is future-safe
      let scheduledDate = new Date(date);
      if (scheduledDate.getTime() <= Date.now() + 2000) {
        scheduledDate = new Date(Date.now() + 2000);
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Reminder',
          body: message,
        },
        trigger: scheduledDate, 
      });

      const newReminder: Reminder = { id: Date.now(), message, dateISO: date.toISOString() };
      const newReminders = [newReminder, ...reminders];
      setReminders(newReminders);
      await saveReminders(newReminders);

      setMessage('');
      Alert.alert('Reminder scheduled for ' + scheduledDate.toLocaleString());
    } catch (error) {
      console.error('Error scheduling notification:', error);
      Alert.alert('Failed to schedule notification');
    }
  };


  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Reminder message"
        style={styles.input}
        value={message}
        onChangeText={setMessage}
      />
      <View style={{ marginVertical: 8 }}>
        <Button title={`Pick date/time — ${date.toLocaleString()}`} onPress={() => setPickerVisible(true)} />
      </View>

      <DateTimePickerModal
        isVisible={pickerVisible}
        mode="datetime"
        date={date}
        onConfirm={setDate}
        onCancel={() => setPickerVisible(false)}
      />

      <Button title="Set Reminder" onPress={scheduleNotification} />

      <Text style={styles.heading}>Upcoming Reminders</Text>
      {reminders.length === 0 ? (
        <Text style={styles.empty}>No reminders</Text>
      ) : (
        <FlatList
          data={reminders}
          keyExtractor={(r) => r.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.reminder}>
              <Text style={styles.msg}>{item.message}</Text>
              <Text style={styles.time}>{new Date(item.dateISO).toLocaleString()}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 12 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10, marginBottom: 8 },
  heading: { marginTop: 16, fontSize: 16, fontWeight: '600' },
  empty: { color: '#666', marginTop: 8 },
  reminder: { marginTop: 8, backgroundColor: '#fff', borderRadius: 10, padding: 10 },
  msg: { fontSize: 15, color: '#111' },
  time: { fontSize: 13, color: '#666' },
});
