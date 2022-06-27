import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {Block, Loading, SmallUserTile, Text, Tile} from '../components';
import EmptyList from '../components/EmptyList';
import {IUser} from '../constants/types';
import {useData, useTheme} from '../hooks';
import {getFriends, getRequestsWithId, removeFriend} from '../services/api';
import {navigate} from '../services/navigation';

export default function Friends() {
  const {sizes, colors} = useTheme();
  const {requests, setRequests, friends, setFriends, user, handleUser} =
    useData();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!friends) {
      setLoading(true);
      handleGetFriends();
    }
    if (!requests) {
      handleGetRequests();
    }
  }, []);

  const handleGetRequests = async () => {
    const response = await getRequestsWithId(user.id);
    if (response.error) return;
    setRequests(response.data);
  };

  const handleGetFriends = async () => {
    const response = await getFriends(user.id);
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
  };

  const renderItem = ({item}: any) => (
    <SmallUserTile
      type="friends"
      {...item}
      isPrivate={item.private}
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
      <Tile
        text="Friends Requests"
        onPress={() => navigate('Requests')}
        right={
          <Block
            flex={0}
            radius={sizes.md / 2}
            height={sizes.md}
            width={sizes.md}
            align="center"
            justify="center"
            color={colors.primary}>
            <Text color={colors.background}>
              {requests ? Object.keys(requests).length : 0}
            </Text>
          </Block>
        }
      />
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
