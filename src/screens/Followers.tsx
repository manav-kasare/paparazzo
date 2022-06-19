import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {Block, Loading, SmallUserTile} from '../components';
import EmptyList from '../components/EmptyList';
import {IUser} from '../constants/types';
import {useData, useTheme} from '../hooks';
import {getDoc, removeFollower} from '../services/api';
import {storeJson} from '../services/store';

export default function Followers() {
  const {sizes} = useTheme();
  const {followers, setFollowers, user, handleUser} = useData();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!followers) {
      setLoading(true);
      handleGetFollowers();
    }
  }, []);

  const handleGetFollowers = async () => {
    const response = await getDoc('followers', user.id);
    if (response.error) return;
    setFollowers(response.data?.users);
    setLoading(false);
  };

  const handleRemoveFollower = async (remoteUser: IUser) => {
    if (followers) {
      setFollowers((prev: Array<any>) =>
        prev.filter(item => item.id !== remoteUser.id),
      );
    }
    handleUser({...user, followers: user.followers - 1});
    const {id, username, avatar} = user;
    await removeFollower({id, username, avatar}, remoteUser);
    storeJson('user', {...user, followers: user.followers - 1});
  };

  const renderItem = ({item}: any) => (
    <SmallUserTile
      handleRemoveFollower={handleRemoveFollower}
      type="followers"
      {...item}
    />
  );

  return (
    <Block paddingVertical={sizes.padding}>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          style={{flex: 1}}
          data={followers}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={followers && !followers.length && {flex: 1}}
          ListEmptyComponent={() => (
            <EmptyList sad text="You don't have any followers yet" />
          )}
        />
      )}
    </Block>
  );
}
