import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {Block, Loading, SmallUserTile, Text, Tile} from '../components';
import EmptyList from '../components/EmptyList';
import {useData, useTheme} from '../hooks';
import {api} from '../services/api';
import {navigate} from '../services/navigation';

export default function Friends() {
  const {sizes, colors} = useTheme();
  const {friends, setFriends, user, friendRequests, setFriendRequests} =
    useData();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!friends) {
      setLoading(true);
      handleGetFriends();
    }
    if (!friendRequests) {
      handleGetRequests();
    }
  }, []);

  const handleGetRequests = async () => {
    const response = await api.friends.requests();
    if (response.error) return;
    setFriendRequests(response.data);
  };

  const handleGetFriends = async () => {
    const response = await api.friends.get();
    if (response.error) return;
    setFriends(response.data);
    setLoading(false);
  };

  const renderItem = ({item}: any) => {
    const id = item.ids.find((i: string) => i !== user.id);
    const _user = item.users[id];
    return <SmallUserTile type="friends" requestId={item.id} {..._user} />;
  };

  const action = () => {
    navigate('Home', {
      screen: 'Search',
    });
  };

  return (
    <Block paddingVertical={sizes.padding}>
      <Tile
        text="Friends Requests"
        onPress={() => navigate('FriendRequests')}
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
              {friendRequests ? Object.keys(friendRequests).length : 0}
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
