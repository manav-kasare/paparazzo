import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {Block, Loading, SmallUserTile} from '../components';
import EmptyList from '../components/EmptyList';
import {IUser} from '../constants/types';
import {useData, useTheme} from '../hooks';
import {accept, getRequestsWithId, reject} from '../services/api';
import {storeJson} from '../services/store';

export default function Requests() {
  const {sizes} = useTheme();
  const {requests, setRequests, user, setFriends, handleUser} = useData();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!requests) {
      setLoading(true);
      handleGetRequests();
    }
  }, []);

  const handleGetRequests = async () => {
    const response = await getRequestsWithId(user.id);
    console.log('response', response);
    if (response.error) return;
    setRequests(response.data);
    setLoading(false);
  };

  const handleAccept = async (remoteUser: IUser, requestId: string) => {
    setRequests(requests.filter(item => item.id !== requestId));
    setFriends((prev: any) => (prev ? [...prev, remoteUser] : [remoteUser]));
    const _user = {id: user.id, username: user.username, avatar: user.avatar};
    handleUser({...user, friends: user.friends + 1});
    await accept(_user, remoteUser, requestId);
    storeJson('user', {...user, friends: user.friends + 1});
  };

  const handleReject = async (remoteUser: IUser, requestId: string) => {
    setRequests(requests.filter(item => item.id !== requestId));
    const _user = {id: user.id, username: user.username, avatar: user.avatar};
    handleUser({...user, friends: user.friends - 1});
    await reject(_user, remoteUser, requestId);
    storeJson('user', {...user, friends: user.friends - 1});
  };

  const renderItem = ({item}: any) => (
    <SmallUserTile
      {...item.from}
      requestId={item.id}
      type="request"
      handleAccept={handleAccept}
      handleReject={handleReject}
    />
  );

  return (
    <Block paddingVertical={sizes.padding}>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={requests}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={(!requests || !requests.length) && {flex: 1}}
          ListEmptyComponent={() => (
            <EmptyList sad text="You don't have any friend requests yet" />
          )}
        />
      )}
    </Block>
  );
}
