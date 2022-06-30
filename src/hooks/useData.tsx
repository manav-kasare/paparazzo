import React, {useCallback, useContext, useState} from 'react';
import {dark} from '../constants';
import {ITheme, IUseData, IUser} from '../constants/types';
import {removeItem, storeJson} from '../services/store';

export const DataContext = React.createContext({});

export const DataProvider = ({children}: {children: React.ReactNode}) => {
  const [theme, setTheme] = useState<ITheme>(dark);
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<String | null>(null);
  const [following, setFollowing] = useState<Array<any> | null>(null);
  const [followers, setFollowers] = useState<Array<any> | null>(null);
  const [friends, setFriends] = useState<Array<any> | null>(null);
  const [friendRequests, setFriendRequests] = useState<Array<any> | null>(null);
  const [followRequests, setFollowRequests] = useState<Array<any> | null>(null);

  const handleUser = useCallback(
    (payload: IUser) => {
      if (!payload) {
        return removeItem('user');
      }
      // set user / compare if has updated
      if (JSON.stringify(payload) !== JSON.stringify(user)) {
        setUser({...user, ...payload});
        storeJson('user', payload);
      }
    },
    [user, setUser],
  );

  const contextValue = {
    theme,
    setTheme,
    token,
    setToken,
    user,
    handleUser,
    following,
    setFollowing,
    followers,
    setFollowers,
    friends,
    setFriends,
    friendRequests,
    setFriendRequests,
    followRequests,
    setFollowRequests,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext) as IUseData;
