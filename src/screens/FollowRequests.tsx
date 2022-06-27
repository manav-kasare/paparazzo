import React from 'react';
import {FlatList} from 'react-native';
import {Block, SmallUserTile} from '../components';
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
      />
    </Block>
  );
}
