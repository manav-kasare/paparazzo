import axios, {AxiosError} from 'axios';
import {API_URL} from './config';

export let instance = axios.create({
  baseURL: API_URL,
  timeout: 1000,
});

export const setHeader = (token: string) => {
  instance = axios.create({
    baseURL: API_URL,
    timeout: 1000,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};

const get = async (endpoint: string) => {
  try {
    const response = await instance.get(endpoint);
    const data: {data: any; error: any} = await response.data;
    return data;
  } catch (error: AxiosError | any) {
    console.log('get error', error.response.data);
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

const put = async (endpoint: string, payload?: Object) => {
  try {
    const response = await instance.put(endpoint, payload);
    const data: {data: any; error: any} = await response.data;
    return data;
  } catch (error: AxiosError | any) {
    console.log('put error', error.response);
    return {data: null, error: 'An unexpected error occured!'};
  }
};

const users = {
  me: async () => await get('/users/me'),
  get: async (id: string) => await get('/users/user/' + id),
  search: async (q: string) => await get('/users/search?query=' + q),
  relations: async (id: string) => await get('/users/relations?userId=' + id),
  update: async (data: Object) => await put('/users/update', data),
  signup: async (data: Object) => await post('/users/signup', data),
  signout: async () => await post('/users/signout'),
  authenticate: async (data: Object) => await post('/users/authenticate', data),
};

const follows = {
  followers: async () => await get('/follows/followers'),
  following: async () => await get('/follows/following'),
  requests: async () => await get('/follows/requests'),
  follow: async (data: Object) => await post('/follows/follow', data),
  request: async (data: Object) => await post('/follows/requests', data),
  unfollow: async (id: string) => await post(`/follows/unfollow?userId=${id}`),
  remove: async (id: string) => await post(`/follows/remove?userId=${id}`),
  accept: async (id: string, data: Object) =>
    await post(`/follows/requests/${id}/accept`, data),
  reject: async (id: string) => await post(`/follows/requests/${id}/reject`),
  removeRequest: async (id: string) =>
    await post(`/follows/requests/${id}/remove`),
};

const friends = {
  get: async () => await get('/friends/'),
  getRequest: async (userId: string) =>
    await get('/friends/request?userId' + userId),
  remove: async (id: string) => await post(`/friends/remove?userId=` + id),
  request: async (data: Object) => await post('/friends/requests', data),
  accept: async (id: string) => await post(`/friends/requests/${id}/accept`),
  reject: async (id: string) => await post(`/friends/requests/${id}/reject`),
  removeRequest: async (id: string) =>
    await post(`/friends/requests/${id}/remove`),
};

export const api = {
  users,
  friends,
  follows,
};
