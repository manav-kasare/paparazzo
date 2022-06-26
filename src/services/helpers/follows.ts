import {IRelation, IUser} from '../../constants/types';
import {follows} from '../api';
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
  const response = await follows.follow(data);
  if (response.error) return showToast('error', response.error);
  handleUser({...user, following: user.following + 1});
  if (following) setFollowing((prev: any) => [...prev, data.remote]);
  return (
    setRelations &&
    setRelations((prev: IRelation) => ({...prev, isFollowing: true}))
  );
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
  const response = await follows.request(data);
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
  const response = await follows.unfollow(userId);
  if (response.error) return showToast('error', response.error);
  handleUser({...user, following: user.following - 1});
  if (following)
    setFollowing((prev: any) => prev.filter((item: any) => item.id !== userId));
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
  const response = await follows.removeRequest(userId);
  if (response.error) return showToast('error', response.error);
  return (
    setRelations &&
    setRelations((prev: any) => ({...prev, followRequested: false}))
  );
};

export const handleAccptRequest = async (
  user: IUser,
  data: Object,
  remoteUser: any,
  handleUser: any,
  following: any,
  setFollowing: any,
  setRelations?: any,
) => {
  const response = await follows.accept(remoteUser.id, data);
  if (response.error) return showToast('error', response.error);
  handleUser({...user, following: user.following + 1});
  if (following) setFollowing((prev: any) => [...prev, remoteUser]);
  return (
    setRelations &&
    setRelations((prev: any) => ({...prev, followRequested: false}))
  );
};
