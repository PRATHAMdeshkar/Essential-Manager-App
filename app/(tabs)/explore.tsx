// app/(tabs)/explore.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import NotificationForm from '../../components/NotificationForm';

export default function RemindersScreen() {
  return (
    <View style={styles.container}>
      <NotificationForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
});
