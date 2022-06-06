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
