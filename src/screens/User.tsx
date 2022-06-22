import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {Block, Button, Image, Text} from '../components';
import EmptyList from '../components/EmptyList';
import {IPost} from '../constants/types';
import {useTheme} from '../hooks';
import {getPosts} from '../services/api';
import {navigate} from '../services/navigation';
import {showToast} from '../services/toast';

export default function User() {
  const {sizes, colors} = useTheme();
  const route = useRoute();
  const {userParam, isFriend, isFollowing}: any = route.params;
  const {id, username, avatar, isPrivate, followers, following, friends} =
    userParam;

  const canSeePosts = isFollowing || isFriend || !isPrivate;

  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    if (canSeePosts) handleGetPosts();
  }, []);

  const handleGetPosts = async () => {
    const response = await getPosts(id);
    if (response.error) return showToast('error', 'Could not get posts');
    setPosts(response.data ? response.data : []);
  };

  const handlePost = () => {
    navigate('CreatePost', {
      remoteUser: {
        id,
        username,
        avatar,
      },
    });
  };

  const renderItem = ({item}: {item: IPost}) => (
    <Button
      onPress={() => navigate('Posts', {posts, item})}
      marginHorizontal={sizes.width * 0.025 * 0.5}
      marginVertical={sizes.width * 0.025 * 0.5}
      width={sizes.width * 0.475}
      height={sizes.width * 0.475}>
      <Image
        height={sizes.width * 0.475}
        width={sizes.width * 0.475}
        resizeMode="contain"
        source={{uri: item.image}}
      />
    </Button>
  );

  return (
    <Block>
      <Block
        color={colors.card}
        style={{
          borderBottomLeftRadius: sizes.cardRadius,
          borderBottomRightRadius: sizes.cardRadius,
        }}
        paddingHorizontal={sizes.padding}
        flex={0}>
        <Block flex={0} row>
          <Block flex={0}>
            <Block
              flex={0}
              height={sizes.avatarSize * 1.6}
              width={sizes.avatarSize * 1.6}
              radius={sizes.avatarRadius * 1.6}
              color={colors.gray}
              style={{alignSelf: 'center'}}
              align="center"
              justify="center">
              <Image
                height={sizes.avatarSize * 1.5}
                width={sizes.avatarSize * 1.5}
                radius={sizes.avatarRadius * 1.5}
                source={{uri: avatar}}
              />
            </Block>

            <Text
              align="center"
              bold
              size={sizes.h5}
              marginTop={sizes.padding}
              lineHeight={sizes.h5}>
              {username}
            </Text>
          </Block>
          <Block marginHorizontal={sizes.padding} paddingBottom={sizes.m} row>
            <Block
              flex={1}
              align="center"
              justify="center"
              paddingVertical={sizes.m}>
              <Text size={sizes.h4} bold lineHeight={sizes.h4}>
                {followers}
              </Text>
              <Text>Followers</Text>
            </Block>
            <Block
              flex={1}
              align="center"
              justify="center"
              paddingVertical={sizes.m}>
              <Text size={sizes.h4} bold lineHeight={sizes.h4}>
                {following}
              </Text>
              <Text>Following</Text>
            </Block>
            <Block
              flex={1}
              align="center"
              justify="center"
              paddingVertical={sizes.m}>
              <Text size={sizes.h4} bold lineHeight={sizes.h4}>
                {friends}
              </Text>
              <Text>Friends</Text>
            </Block>
          </Block>
        </Block>

        <Block marginVertical={sizes.padding} row flex={0}>
          {isFriend && (
            <Button
              flex={1}
              onPress={handlePost}
              color={colors.background}
              marginLeft={sizes.padding / 2}
              paddingHorizontal={sizes.padding}>
              <Text>Post</Text>
            </Button>
          )}
        </Block>
      </Block>

      <Block paddingVertical={sizes.padding}>
        {canSeePosts ? (
          <FlatList
            style={{marginBottom: sizes.padding * 3}}
            data={posts}
            renderItem={renderItem}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={(!posts || !posts.length) && {flex: 1}}
            ListEmptyComponent={() => (
              <EmptyList sad text="This user has not posted yet" />
            )}
          />
        ) : (
          <Block align="center" justify="center">
            <EmptyList sad text="This account is private" />
          </Block>
        )}
      </Block>
    </Block>
  );
}
