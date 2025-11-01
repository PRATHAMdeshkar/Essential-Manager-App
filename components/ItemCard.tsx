// components/ItemCard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Item } from '../hooks/useStorage';

type Props = {
  item: Item;
  onToggle: (id: number) => void; // mark purchased
  onDelete: (id: number) => void;
};

export default function ItemCard({ item, onToggle, onDelete }: Props) {
  return (
    <View style={styles.card}>
      <TouchableOpacity style={{ flex: 1 }} onPress={() => onToggle(item.id)}>
        <Text style={styles.text}>{item.name}</Text>
      </TouchableOpacity>

      <Checkbox
        status={'unchecked'}
        onPress={() => onToggle(item.id)}
        accessibilityLabel="Mark purchased"
      />

      <TouchableOpacity onPress={() => onDelete(item.id)} style={{ marginLeft: 8 }}>
        <Ionicons name="trash-outline" size={22} color="#dc2626" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 6,
    borderRadius: 12,
    elevation: 2,
  },
  text: { fontSize: 16, color: '#111' },
});
