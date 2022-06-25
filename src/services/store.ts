import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeJson = async (key: string, data: Object) => {
  const strigified = JSON.stringify(data);
  await AsyncStorage.setItem(key, strigified);
};

export const getJson = async (key: string) => {
  const data = await AsyncStorage.getItem(key);
  if (data) {
    const parsed = await JSON.parse(data);
    return parsed;
  }
  return null;
};

export const storeString = async (key: string, data: string) => {
  await AsyncStorage.setItem(key, data);
};

export const getString = async (key: string) => {
  return await AsyncStorage.getItem(key);
};

export const removeItem = async (key: string) => {
  await AsyncStorage.removeItem(key);
  return null;
};
