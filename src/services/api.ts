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

export const storeUser = async (id: string, payload: any) => {
  try {
    const token = await getToken();
    const finalPayload = {id, private: true, fcm: [token], ...payload};
    await firestore().collection('users').doc(id).set(finalPayload);
    return {data: finalPayload, error: null};
  } catch (error) {
    return {error, data: null};
  }
};

export const getCurrentUser = () => {
  try {
    const data = auth().currentUser;
    return {data, error: null};
  } catch (error) {
    return {error, data: null};
  }
};

export const updateDoc = async (
  collection: string,
  docId: string,
  payload: any,
) => {
  try {
    const data = await firestore()
      .collection(collection)
      .doc(docId)
      .update(payload);
    return {data, error: null};
  } catch (error) {
    return {error, data: null};
  }
};

export const getDoc = async (collection: string, docId: string) => {
  try {
    const doc = await firestore().collection(collection).doc(docId).get();
    const data = doc.data();
    return {data, error: null};
  } catch (error) {
    return {error, data: null};
  }
};

export const searchUsers = async (userId: string, query: string) => {
  try {
    const docs = await firestore()
      .collection('users')
      .where('id', '!=', userId)
      .where('username', '==', query)
      .get();
    const data = docs.docs.map(item => item.data());
    return {data, error: null};
  } catch (error) {
    return {error, data: null};
  }
};
