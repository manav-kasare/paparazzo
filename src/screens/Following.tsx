import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import {Block, SmallUserTile, UserTile} from '../components';
import {IUser} from '../constants/types';
import {useData, useTheme} from '../hooks';
import {getDoc, unfollow} from '../services/api';
import {storeJson} from '../services/store';

export default function Following() {
  const {sizes} = useTheme();
  const {following, setFollowing, user, handleUser} = useData();

  useEffect(() => {
    if (!following) {
      handleGetFollowing();
    }
  }, []);

  const handleUnfollow = async (remoteUser: IUser) => {
    if (following) {
      setFollowing((prev: Array<any>) =>
        prev.filter(item => item.id !== remoteUser.id),
      );
    }
    handleUser({...user, following: user.following - 1});
    const {id, username, avatar} = user;
    await unfollow({id, username, avatar}, remoteUser);
    storeJson('user', {...user, following: user.following - 1});
  };

  const handleGetFollowing = async () => {
    const response = await getDoc('following', user.id);
    if (response.error) return;
    setFollowing(response.data?.users);
  };

  const renderItem = ({item}: any) => (
    <SmallUserTile
      handleUnfollow={handleUnfollow}
      isFollowing={true}
      {...item}
    />
  );

  return (
    <Block paddingVertical={sizes.padding}>
      <FlatList
        data={following}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </Block>
  );
}
