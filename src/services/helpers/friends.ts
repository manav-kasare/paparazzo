import {IUser} from '../../constants/types';
import {api} from '../api';
import {showToast} from '../toast';

export const handleRequest = async (
  user: IUser,
  userId: string,
  setRelations?: any,
) => {
  const data = {
    me: {
      id: user.id,
      username: user.username,
      avatar: user.avatar,
    },
    userId,
  };
  const response = await api.friends.request(data);
  if (response.error) return showToast('error', response.error);
  return (
    setRelations &&
    setRelations((prev: any) => ({
      ...prev,
      friendRequested: true,
    }))
  );
};

export const handleAccept = async (
  remote: any,
  requestId: string,
  friends: any,
  setFriends: any,
  setFriendRequests: any,
  user: IUser,
  handleUser: any,
) => {
  const data = {
    ids: [remote.id, user.id],
    users: {
      [remote.id]: remote,
      [user.id]: {
        id: user.id,
        avatar: user.avatar,
        username: user.username,
      },
    },
  };
  if (friends) setFriends((prev: any) => [...prev, data]);
  setFriendRequests((prev: any) =>
    prev.filter((item: any) => item.id !== requestId),
  );
  handleUser({friends: user.friends + 1});
  const response = await api.friends.accept(requestId);
  if (response.error) return showToast('error', response.error);
  return;
};

export const handleReject = async (
  requestId: string,
  friends: any,
  setFriends: any,
  setFriendRequests: any,
) => {
  if (friends) setFriends(friends.filter((item: any) => item.id !== requestId));
  setFriendRequests((prev: any) =>
    prev.filter((item: any) => item.id !== requestId),
  );
  const response = await api.friends.reject(requestId);
  if (response.error) return showToast('error', response.error);
  return;
};

export const handleRemove = async (
  requestId: string,
  friends: any,
  setFriends: any,
  user: IUser,
  handleUser: any,
  setRelations?: any,
) => {
  const response = await api.friends.remove(requestId);
  if (response.error) return showToast('error', response.error);
  if (friends) setFriends(friends.filter((item: any) => item.id !== requestId));
  handleUser({friends: user.friends - 1});
  return (
    setRelations &&
    setRelations((prev: any) => ({
      ...prev,
      isFriend: false,
    }))
  );
};

export const handleRemoveRequest = async (
  requestId: string,
  setRelations?: any,
) => {
  const response = await api.friends.remove(requestId);
  if (response.error) return showToast('error', response.error);
  return (
    setRelations &&
    setRelations((prev: any) => ({
      ...prev,
      friendRequested: false,
    }))
  );
};
