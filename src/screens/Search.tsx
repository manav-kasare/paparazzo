import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {Block, Input, UserTile} from '../components';
import {username} from '../constants/regex';
import {IUser} from '../constants/types';
import {useData, useTheme} from '../hooks';
import {
  follow,
  getFollowing,
  searchUsers,
  unfollow,
  updateDoc,
} from '../services/api';
import {showToast} from '../services/toast';

export default function Search() {
  const {user, setFollowing, handleUser} = useData();
  const {colors, sizes} = useTheme();
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState<Array<any>>([]);
  const [following, _setFollowing] = useState<any | null>(null);

  useEffect(() => {
    handleGetFollowing();
  }, []);

  const handleGetFollowing = async () => {
    const response = await getFollowing(user.id);
    console.log('response', response);
    if (response.error) return;
    _setFollowing(response.data);
  };

  const handleSearch = async () => {
    const isValid = username.test(query);
    if (!isValid) return showToast('error', 'Please enter a valid username.');
    const response = await searchUsers(user.id, query);
    console.log('response', response);
    if (response.error)
      return showToast('error', 'Could not search for users!');
    setUsers(response.data ? response.data : []);
  };

  const handleFollow = async (remoteUser: IUser) => {
    _setFollowing((prev: any) =>
      prev ? {...prev, [remoteUser.id]: true} : {[remoteUser.id]: true},
    );
    setFollowing((prev: any) => (prev ? [...prev, remoteUser] : [remoteUser]));
    handleUser({...user, following: user.following + 1});
    const {id, username, avatar} = user;
    await follow({id, username, avatar}, remoteUser);
  };

  const handleUnfollow = async (remoteUser: IUser) => {
    _setFollowing((prev: any) => {
      delete prev[remoteUser.id];
    });
    setFollowing((prev: Array<any>) =>
      prev ? prev.filter(item => item.id !== remoteUser.id) : [],
    );
    handleUser({...user, following: user.following - 1});
    const {id, username, avatar} = user;
    await unfollow({id, username, avatar}, remoteUser);
  };

  const renderItem = ({item}: {item: IUser}) => (
    <UserTile
      {...item}
      handleFollow={handleFollow}
      handleUnfollow={handleUnfollow}
      isFollowing={following && following[item.id]}
    />
  );

  return (
    <Block keyboard>
      <Block
        flex={0}
        style={{
          borderBottomLeftRadius: sizes.cardRadius,
          borderBottomRightRadius: sizes.cardRadius,
        }}
        padding={sizes.padding}
        color={colors.card}>
        <Input
          value={query}
          onChangeText={setQuery}
          search
          handleSearch={handleSearch}
          placeholder="Type username here..."
        />
      </Block>

      <Block paddingVertical={sizes.m}>
        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </Block>
    </Block>
  );
}
