// hooks/useStorage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const ITEMS_KEY = 'ESSENTIALS_ITEMS_V1';
const HISTORY_KEY = 'ESSENTIALS_HISTORY_V1';
const REMINDERS_KEY = 'ESSENTIALS_REMINDERS_V1';

export type Item = {
  id: number;
  name: string;
};

export type History = { [dateKey: string]: Item[] };

export type Reminder = {
  id: number;
  message: string;
  dateISO: string; // ISO string for date/time
};

export const saveItems = async (items: Item[]) => {
  try {
    await AsyncStorage.setItem(ITEMS_KEY, JSON.stringify(items || []));
  } catch (e) {
    console.error('saveItems error', e);
  }
};

export const loadItems = async (): Promise<Item[]> => {
  try {
    const raw = await AsyncStorage.getItem(ITEMS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('loadItems error', e);
    return [];
  }
};

export const saveHistory = async (history: History) => {
  try {
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history || {}));
  } catch (e) {
    console.error('saveHistory error', e);
  }
};

export const loadHistory = async (): Promise<History> => {
  try {
    const raw = await AsyncStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.error('loadHistory error', e);
    return {};
  }
};

export const saveReminders = async (reminders: Reminder[]) => {
  try {
    await AsyncStorage.setItem(REMINDERS_KEY, JSON.stringify(reminders || []));
  } catch (e) {
    console.error('saveReminders error', e);
  }
};

export const loadReminders = async (): Promise<Reminder[]> => {
  try {
    const raw = await AsyncStorage.getItem(REMINDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('loadReminders error', e);
    return [];
  }
};
