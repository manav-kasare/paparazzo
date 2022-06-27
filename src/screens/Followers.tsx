import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {Block, Loading, SmallUserTile, Text, Tile} from '../components';
import EmptyList from '../components/EmptyList';
import {IUser} from '../constants/types';
import {useData, useTheme} from '../hooks';
import {follows} from '../services/api';
import {handleRemove} from '../services/helpers/follows';
import {navigate} from '../services/navigation';

export default function Followers() {
  const {sizes, colors} = useTheme();
  const {
    followers,
    setFollowers,
    user,
    handleUser,
    followRequests,
    setFollowRequests,
  } = useData();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!followers) {
      setLoading(true);
      handleGetFollowers();
    }
    if (!followRequests) {
      handleGetFollowRequests();
    }
  }, []);

  const handleGetFollowers = async () => {
    const response = await follows.followers();
    if (response.error) return;
    setFollowers(response.data ? response.data : []);
    setLoading(false);
  };

  const handleGetFollowRequests = async () => {
    const response = await follows.requests();
    if (response.error) return;
    setFollowRequests(response.data ? response.data : []);
  };

  const handleRemoveFollower = async (remoteUser: IUser) => {
    await handleRemove(
      user,
      remoteUser.id,
      handleUser,
      followers,
      setFollowers,
    );
  };

  const renderItem = ({item}: any) => (
    <SmallUserTile
      handleRemoveFollower={handleRemoveFollower}
      type="followers"
      {...item.user}
    />
  );

  return (
    <Block paddingVertical={sizes.padding}>
      <Tile
        text="Follow Requests"
        onPress={() => navigate('FollowRequests')}
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
              {followRequests ? followRequests.length : 0}
            </Text>
          </Block>
        }
      />
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          style={{flex: 1}}
          data={followers}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={(!followers || !followers.length) && {flex: 1}}
          ListEmptyComponent={() => (
            <EmptyList sad text="You don't have any followers yet" />
          )}
        />
      )}
    </Block>
  );
}
