import React from 'react';
import {FlatList} from 'react-native';
import {Block, SmallUserTile} from '../components';
import EmptyList from '../components/EmptyList';
import {useData, useTheme} from '../hooks';

export default function FollowRequests() {
  const {followRequests} = useData();
  const {sizes} = useTheme();

  const renderItem = ({item}: any) => (
    <SmallUserTile type="followRequest" {...item.from} requestId={item.id} />
  );

  return (
    <Block paddingVertical={sizes.padding}>
      <FlatList
        data={followRequests}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={
          (!followRequests || !followRequests.length) && {flex: 1}
        }
        ListEmptyComponent={() => (
          <EmptyList sad text="You don't have any follow requests yet" />
        )}
      />
    </Block>
  );
}
