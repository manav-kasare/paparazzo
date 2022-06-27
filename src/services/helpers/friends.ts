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
  _friends: any,
  setFriends: any,
  setFriendRequests: any,
) => {
  const response = await api.friends.accept(requestId);
  if (response.error) return showToast('error', response.error);
  if (_friends) setFriends((prev: any) => [...prev, remote]);
  setFriendRequests((prev: any) =>
    prev.filter((item: any) => item.id !== requestId),
  );
  return;
};

export const handleReject = async (
  remoteId: string,
  requestId: string,
  _friends: any,
  setFriends: any,
) => {
  const response = await api.friends.accept(requestId);
  if (response.error) return showToast('error', response.error);
  if (_friends)
    setFriends(_friends.filter((item: any) => item.remote.id !== remoteId));
  return;
};

export const handleRemove = async (
  remoteId: string,
  _friends: any,
  setFriends: any,
  setRelations?: any,
) => {
  const response = await api.friends.remove(remoteId);
  if (response.error) return showToast('error', response.error);
  if (_friends)
    setFriends(_friends.filter((item: any) => item.remote.id !== remoteId));
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
