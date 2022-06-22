import {useRoute} from '@react-navigation/native';
import React from 'react';
import {Block, Button, Image, Text} from '../components';
import EmptyList from '../components/EmptyList';
import {useTheme} from '../hooks';
import {navigate} from '../services/navigation';

export default function User() {
  const {sizes, colors} = useTheme();
  const route = useRoute();
  const {userParam, isFriend, isFollowing}: any = route.params;
  const {id, username, avatar, isPrivate, followers, following, friends} =
    userParam;

  const canSeePosts = isFollowing || !isPrivate;

  const handlePost = () => {
    navigate('CreatePost', {
      remoteUser: {
        id,
        username,
        avatar,
      },
    });
  };

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

      <Block>
        {!canSeePosts ? (
          <Text>Posts</Text>
        ) : (
          <Block align="center" justify="center">
            <EmptyList sad text="This account is private" />
          </Block>
        )}
      </Block>
    </Block>
  );
}
