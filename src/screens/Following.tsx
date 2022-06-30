import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {Block, Loading, SmallUserTile} from '../components';
import EmptyList from '../components/EmptyList';
import {useData, useTheme} from '../hooks';
import {api} from '../services/api';
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
    const response = await api.follows.following();
    if (response.error) return;
    setFollowing(response.data);
    setLoading(false);
  };

  const renderItem = ({item}: any) => (
    <SmallUserTile type="following" {...item.user} />
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
