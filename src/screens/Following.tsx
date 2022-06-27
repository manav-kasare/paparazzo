import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {Block, Loading, SmallUserTile} from '../components';
import EmptyList from '../components/EmptyList';
import {IUser} from '../constants/types';
import {useData, useTheme} from '../hooks';
import {getDoc, unfollow} from '../services/api';
import {navigate} from '../services/navigation';

export default function Following() {
  const {sizes} = useTheme();
  const {following, setFollowing, user, handleUser} = useData();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!following) {
      setLoading(true);
      handleGetFollowing();
    }
  }, []);

  const handleGetFollowing = async () => {
    const response = await getDoc('following', user.id);
    if (response.error) return;
    setFollowing(response.data?.users);
    setLoading(false);
  };

  const handleUnfollow = async (remoteUser: IUser) => {
    if (following) {
      setFollowing((prev: Array<any>) =>
        prev.filter(item => item.id !== remoteUser.id),
      );
    }
    handleUser({...user, following: user.following - 1});
    const {id, username, avatar} = user;
    await unfollow({id, username, avatar}, remoteUser);
  };

  const renderItem = ({item}: any) => (
    <SmallUserTile type="following" handleUnfollow={handleUnfollow} {...item} />
  );

  const action = () => {
    navigate('Home', {
      screen: 'Search',
    });
  };

  return (
    <Block paddingVertical={sizes.padding}>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          style={{flex: 1}}
          data={following}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={(!following || !following.length) && {flex: 1}}
          ListEmptyComponent={() => (
            <EmptyList
              sad
              text="You aren't following anyone yet"
              action={action}
              actionText="Find People"
            />
          )}
        />
      )}
    </Block>
  );
}
