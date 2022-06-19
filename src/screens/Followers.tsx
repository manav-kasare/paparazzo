import React from 'react';
import {FlatList} from 'react-native';
import {Block, SmallUserTile} from '../components';
import EmptyList from '../components/EmptyList';
import {useData} from '../hooks';

export default function Followers() {
  const {followers, setFollowers} = useData();

  const renderItem = ({item}: any) => <SmallUserTile {...item} />;

  return (
    <Block>
      <FlatList
        style={{flex: 1}}
        data={followers}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{flex: 1}}
        ListEmptyComponent={() => (
          <EmptyList sad text="You don't have any followers yet" />
        )}
      />
    </Block>
  );
}
