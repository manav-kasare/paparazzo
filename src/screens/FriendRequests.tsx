import React, {useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {Block, Loading, SmallUserTile} from '../components';
import EmptyList from '../components/EmptyList';
import {useData, useTheme} from '../hooks';

export default function FriendRequests() {
  const {sizes} = useTheme();
  const {friendRequests} = useData();
  const [loading, setLoading] = useState(false);

  const renderItem = ({item}: any) => (
    <SmallUserTile {...item.from} requestId={item.id} type="friendRequest" />
  );

  return (
    <Block paddingVertical={sizes.padding}>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={friendRequests}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={
            (!friendRequests || !friendRequests.length) && {flex: 1}
          }
          ListEmptyComponent={() => (
            <EmptyList sad text="You don't have any friend requests yet" />
          )}
        />
      )}
    </Block>
  );
}
