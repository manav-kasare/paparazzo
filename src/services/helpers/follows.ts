import {IRelation, IUser} from '../../constants/types';
import {api} from '../api';

import {showToast} from '../toast';

type User = {
  id: string;
  username: string;
  avatar: string;
};

export const handleFollow = async (
  user: IUser,
  remoteUser: User,
  handleUser: any,
  following: any,
  setFollowing: any,
  setRelations?: any,
) => {
  const data = {
    me: {
      id: user.id,
      username: user.username,
      avatar: user.avatar,
    },
    remote: {
      id: remoteUser.id,
      username: remoteUser.username,
      avatar: remoteUser.avatar,
    },
  };
  const response = await api.follows.follow(data);
  if (response.error) return showToast('error', response.error);
  handleUser({...user, following: user.following + 1});
  if (following) setFollowing((prev: any) => [...prev, data.remote]);
  return (
    setRelations &&
    setRelations((prev: IRelation) => ({...prev, isFollowing: true}))
  );
};

export const handleRemove = async (
  user: IUser,
  userId: string,
  handleUser: any,
  followers: any,
  setFollowers: any,
) => {
  const response = await api.follows.remove(userId);
  if (response.error) return showToast('error', response.error);
  handleUser({followers: user.followers - 1});
  setFollowers(followers.filter((item: any) => item.user.id !== userId));
  return;
};

export const handleFollowRequest = async (
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
  const response = await api.follows.request(data);
  if (response.error) return showToast('error', response.error);
  return (
    setRelations &&
    setRelations((prev: any) => ({
      ...prev,
      followRequested: true,
    }))
  );
};

export const handleUnfollow = async (
  user: IUser,
  userId: string,
  handleUser: any,
  following: any,
  setFollowing: any,
  setRelations?: any,
) => {
  const response = await api.follows.unfollow(userId);
  if (response.error) return showToast('error', response.error);
  handleUser({...user, following: user.following - 1});
  if (following)
    setFollowing((prev: any) =>
      prev.filter((item: any) => item.user.id !== userId),
    );
  return (
    setRelations &&
    setRelations((prev: any) => ({
      ...prev,
      ifFollowing: false,
    }))
  );
};

export const handleRemoveRequest = async (
  userId: string,
  setRelations?: any,
) => {
  const response = await api.follows.removeRequest(userId);
  if (response.error) return showToast('error', response.error);
  return (
    setRelations &&
    setRelations((prev: any) => ({...prev, followRequested: false}))
  );
};

export const handleAccept = async (
  requestId: string,
  user: IUser,
  remoteUser: any,
  handleUser: any,
  followers: any,
  setFollowers: any,
  setFollowRequests: any,
) => {
  const data = {
    me: {
      id: user.id,
      username: user.username,
      avatar: user.avatar,
    },
    remote: {
      id: remoteUser.id,
      username: remoteUser.username,
      avatar: remoteUser.avatar,
    },
  };
  setFollowRequests((prev: any) =>
    prev.filter((item: any) => item.from.id !== remoteUser.id),
  );
  const response = await api.follows.accept(requestId, data);
  if (response.error) return showToast('error', response.error);
  handleUser({...user, followers: user.followers + 1});
  if (followers) setFollowers((prev: any) => [...prev, response.data]);
  return;
};

export const handleReject = async (requestId: any, setFollowRequests: any) => {
  setFollowRequests((prev: any) =>
    prev.filter((item: any) => item.id !== requestId),
  );
  const response = await api.follows.reject(requestId);
  if (response.error) return showToast('error', response.error);
  return;
};
