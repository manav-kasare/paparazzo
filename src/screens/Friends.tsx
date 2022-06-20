import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {Block, Loading, SmallUserTile, Tile} from '../components';
import EmptyList from '../components/EmptyList';
import {IUser} from '../constants/types';
import {useData, useTheme} from '../hooks';
import {getFriends, removeFriend} from '../services/api';
import {navigate} from '../services/navigation';
import {storeJson} from '../services/store';

export default function Friends() {
  const {sizes} = useTheme();
  const {friends, setFriends, user, handleUser} = useData();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!friends) {
      setLoading(true);
      handleGetFriends();
    }
  }, []);

  const handleGetFriends = async () => {
    const response = await getFriends(user.id);
    console.log('friends', response);
    if (response.error) return;
    setFriends(response.data?.users);
    setLoading(false);
  };

  const handleRemoveFriend = async (remoteUser: IUser) => {
    setFriends((prev: Array<any>) =>
      prev.filter(item => item.id !== remoteUser.id),
    );
    const _user = {id: user.id, username: user.username, avatar: user.avatar};
    handleUser({...user, friends: user.friends - 1});
    await removeFriend(_user, remoteUser);
    storeJson('user', {...user, friends: user.friends - 1});
  };

  const renderItem = ({item}: any) => (
    <SmallUserTile
      type="friends"
      {...item}
      handleRemoveFriend={handleRemoveFriend}
    />
  );

  const action = () => {
    navigate('Home', {
      screen: 'Search',
    });
  };

  return (
    <Block paddingVertical={sizes.padding}>
      <Tile text="Requests" onPress={() => navigate('Requests')} />
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          style={{flex: 1}}
          data={friends}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={(!friends || !friends.length) && {flex: 1}}
          ListEmptyComponent={() => (
            <EmptyList
              sad
              text="You don't have any friends yet"
              action={action}
              actionText="Find People"
            />
          )}
        />
      )}
    </Block>
  );
}
