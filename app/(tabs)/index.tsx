// app/(tabs)/index.tsx
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import ItemCard from '../../components/ItemCard';
import AddItemForm from '../../components/AddItemForm';
import { saveItems, loadItems, loadHistory, saveHistory, Item, History } from '../../hooks/useStorage';

export default function Dashboard() {
  const [items, setItems] = useState<Item[]>([]);
  const [history, setHistory] = useState<History>({});

  useEffect(() => {
    (async () => {
      const loadedItems = await loadItems();
      const loadedHistory = await loadHistory();
      setItems(loadedItems);
      setHistory(loadedHistory);
    })();
  }, []);

  const addItem = async (name: string) => {
    const newItem: Item = { id: Date.now(), name };
    const newItems = [newItem, ...items];
    setItems(newItems);
    await saveItems(newItems);
  };

  // When user marks item purchased we move that single item to history keyed by today's date
  const markPurchased = async (id: number) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;

    // remove from active items
    const remaining = items.filter((i) => i.id !== id);
    setItems(remaining);
    await saveItems(remaining);

    // add to history under today's date
    const dateKey = new Date().toLocaleDateString();
    const prev = history[dateKey] || [];
    const newHistory = { ...history, [dateKey]: [item, ...prev] };
    setHistory(newHistory);
    await saveHistory(newHistory);
  };

  const deleteItem = async (id: number) => {
    const filtered = items.filter((i) => i.id !== id);
    setItems(filtered);
    await saveItems(filtered);
  };

  return (
    <View style={styles.container}>
      <AddItemForm onAdd={addItem} />
      {items.length === 0 ? (
        <Text style={styles.empty}>No active items — add something to shop</Text>
      ) : (
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <ItemCard item={item} onToggle={markPurchased} onDelete={deleteItem} />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f9fafb' },
  empty: { marginTop: 30, textAlign: 'center', color: '#666' },
});
