import axios, {AxiosError} from 'axios';
import {API_URL} from './config';

const instance = axios.create({
  baseURL: API_URL,
  timeout: 1000,
});

export const setHeader = (token: string) => {
  instance.defaults.headers.post['Authorization'] = 'Bearer ' + token;
};

const get = async (endpoint: string) => {
  try {
    const response = await instance.get(endpoint);
    const data: {data: any; error: any} = await response.data;
    return data;
  } catch (error) {
    return {data: null, error: 'An unexpected error occured!'};
  }
};

const post = async (endpoint: string, payload?: Object) => {
  try {
    const response = await instance.post(endpoint, payload);
    const data: {data: any; error: any} = await response.data;
    return data;
  } catch (error: AxiosError | any) {
    console.log('post error', error.response);
    return {data: null, error: 'An unexpected error occured!'};
  }
};

export const users = {
  me: async () => await get('/users/me'),
  get: async (id: string) => await get('/users/' + id),
  signup: async (payload: Object) => await post('/users/signup', payload),
  signout: async () => await post('/users/signout'),
  authenticate: async (data: Object) => await post('/users/authenticate', data),
};
