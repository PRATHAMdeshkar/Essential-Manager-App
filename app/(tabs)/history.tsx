// app/(tabs)/history.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { loadHistory } from '../../hooks/useStorage';

export default function HistoryScreen() {
  const [history, setHistory] = useState<{ [k: string]: any[] }>({});

  useEffect(() => {
    (async () => {
      const h = await loadHistory();
      setHistory(h || {});
    })();
  }, []);

  const dates = Object.keys(history).sort((a, b) => (a < b ? 1 : -1));

  return (
    <View style={styles.container}>
      <FlatList
        data={dates}
        keyExtractor={(d) => d}
        renderItem={({ item: dateKey }) => (
          <View style={styles.section}>
            <Text style={styles.date}>{dateKey}</Text>
            {history[dateKey].map((it: any) => (
              <Text key={it.id} style={styles.item}>• {it.name}</Text>
            ))}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f9fafb' },
  section: { marginBottom: 18 },
  date: { fontSize: 16, fontWeight: '700', color: '#2563eb', marginBottom: 6 },
  item: { marginLeft: 8, fontSize: 14 },
});
