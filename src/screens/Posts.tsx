import {useRoute} from '@react-navigation/native';
import React from 'react';
import {FlatList} from 'react-native';
import {Block} from '../components';
import Post from '../components/Post';
import {IPost} from '../constants/types';

export default function Posts() {
  const route = useRoute();
  const {posts, item}: any = route.params;

  const renderItem = ({item}: {item: IPost}) => <Post {...item} />;

  return (
    <Block>
      <FlatList
        initialScrollIndex={posts.indexOf(item)}
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id}
      />
    </Block>
  );
}
