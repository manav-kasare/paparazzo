import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';
import {IPost, IUser} from '../constants/types';
import {API_URL} from './config';
import {getToken} from './fcm';

export const instance = axios.create({
  baseURL: API_URL,
  timeout: 1000,
});

const get = async (endpoint: string) => {
  try {
    const response = await instance.get(endpoint);
    const data: {data: any; error: any} = await response.data;
    return data;
  } catch (error) {
    return {data: null, error: 'An unexpected error occured!'};
  }
};

const post = async (endpoint: string, payload: Object) => {
  try {
    const response = await instance.post(endpoint, payload);
    const data: {data: any; error: any} = await response.data;
    return data;
  } catch (error) {
    console.log('post error', error);
    return {data: null, error: 'An unexpected error occured!'};
  }
};

export const users = {
  authenticate: async (payload: Object) =>
    await post('/users/authenticate', payload),
  signup: async (payload: Object) => await post('/users/signup', payload),
};
