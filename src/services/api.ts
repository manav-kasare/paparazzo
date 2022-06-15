import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {getToken} from './fcm';

export const authenticate = async (email: string, password: string) => {
  try {
    const response = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    return {error: null, data: response};
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      return await login(email, password);
    }

    if (error.code === 'auth/invalid-email') {
      return {error: 'That email address is invalid!', data: null};
    }
    return {error, data: null};
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await auth().signInWithEmailAndPassword(email, password);
    return {error: null, data: response};
  } catch (error: any) {
    if (error.code === 'auth/invalid-email')
      return {error: 'That email address is invalid!', data: null};
    else if (error.code === 'auth/wrong-password')
      return {error: 'The entered password is wrong!', data: null};
    return {error, data: null};
  }
};

export const getRandomId = () => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let autoId = '';
  for (let i = 0; i < 20; i++) {
    autoId += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return autoId;
};

export const storeUser = async (id: string, payload: any) => {
  try {
    const token = await getToken();
    const data = await firestore()
      .collection('users')
      .doc(id)
      .set({id, fcm: token, ...payload});
    return {data, error: null};
  } catch (error) {
    return {error, data: null};
  }
};

// export const getUser = async (payload: any) => {
//   try {
//     const data = await firestore().collection('users').add(payload);
//     return {data, error: null};
//   } catch (error) {
//     return {error, data: null};
//   }
// };
