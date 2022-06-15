import messaging from '@react-native-firebase/messaging';

export const getToken = async () => {
  return await messaging().getToken();
};
