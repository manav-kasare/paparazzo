import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {Block, Button, Image, Loading, Text} from '../components';
import EmptyList from '../components/EmptyList';
import {IPost} from '../constants/types';
import {useData, useTheme} from '../hooks';
import {api} from '../services/api';
import {
  handleFollow,
  handleFollowRequest as handleRemoveFollowRequest,
  handleRemoveRequest,
  handleUnfollow,
} from '../services/helpers/follows';
import {
  handleRemove,
  handleRemoveRequest as handleRemoveFriendRequest,
  handleRequest as handleFriendRequest,
} from '../services/helpers/friends';
import {navigate} from '../services/navigation';
import {showToast} from '../services/toast';

export default function User() {
  const route = useRoute();
  const {sizes, colors} = useTheme();
  const {user, handleUser, following, setFollowing, friends, setFriends} =
    useData();
  const {userParam}: any = route.params;
  const {id, username, avatar} = userParam;

  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [_user, _setUser] = useState({
    id,
    username,
    avatar,
    isPrivate: true,
    followers: 0,
    friends: 0,
    following: 0,
  });
  const [relations, setRelations] = useState({
    isFollowing: false,
    isFriend: false,
    followRequested: false,
    friendRequested: false,
  });
  const [canSeePosts, setCanSeePosts] = useState(false);

  useEffect(() => {
    setLoading(true);
    handleGetRelations();
    handleGetUser();
  }, []);

  const handleGetRelations = async () => {
    const response = await api.users.relations(id);
    if (response.error) return;
    setRelations({...relations, ...response.data});
    setLoading(false);
  };

  const handleGetUser = async () => {
    const response = await api.users.get(id);
    if (response.error) return;
    _setUser(prev => ({...prev, ...response.data}));
    const _canSeePosts =
      relations.isFollowing || relations.isFriend || !response.data.isPrivate;
    setCanSeePosts(_canSeePosts);
    if (_canSeePosts) return handleGetPosts();
  };

  const handleGetPosts = async () => {};

  const onPressFollowButton = async () => {
    if (relations.isFollowing) {
      await handleUnfollow(
        user,
        id,
        handleUser,
        following,
        setFollowing,
        setRelations,
      );
    } else {
      if (relations.followRequested) {
        await handleRemoveRequest(id, setRelations);
      } else {
        if (_user.isPrivate) {
          await handleRemoveFollowRequest(user, id, setRelations);
        } else {
          const remoteUser = {id, username, avatar};
          await handleFollow(
            user,
            remoteUser,
            handleUser,
            following,
            setFollowing,
            setRelations,
          );
        }
      }
    }
  };

  const onPresssFriendButton = async () => {
    if (relations.isFriend) {
      await handleRemove(id, friends, setFriends, setRelations);
    } else {
      if (relations.friendRequested) {
        const response = await api.friends.getRequest(id);
        if (response.error)
          return showToast('error', 'Could not remove request!');
        await handleRemoveFriendRequest(response.data.id, setRelations);
      } else {
        await handleFriendRequest(user, id, setRelations);
      }
    }
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
                {_user.followers}
              </Text>
              <Text>Followers</Text>
            </Block>
            <Block
              flex={1}
              align="center"
              justify="center"
              paddingVertical={sizes.m}>
              <Text size={sizes.h4} bold lineHeight={sizes.h4}>
                {_user.following}
              </Text>
              <Text>Following</Text>
            </Block>
            <Block
              flex={1}
              align="center"
              justify="center"
              paddingVertical={sizes.m}>
              <Text size={sizes.h4} bold lineHeight={sizes.h4}>
                {_user.friends}
              </Text>
              <Text>Friends</Text>
            </Block>
          </Block>
        </Block>

        <Block flex={0} marginVertical={sizes.padding}>
          <Block marginBottom={sizes.padding} flex={0} row>
            <Button
              flex={1}
              onPress={onPressFollowButton}
              color={colors.background}
              marginLeft={sizes.padding / 2}
              paddingHorizontal={sizes.padding}>
              <Text>
                {relations.isFollowing
                  ? 'Unfollow'
                  : relations.followRequested
                  ? 'Follow Requested'
                  : _user.isPrivate
                  ? 'Follow Request'
                  : 'Follow'}
              </Text>
            </Button>
            <Button
              flex={1}
              onPress={onPresssFriendButton}
              color={colors.background}
              marginLeft={sizes.padding / 2}
              paddingHorizontal={sizes.padding}>
              <Text>
                {relations.isFriend
                  ? 'Friends'
                  : relations.friendRequested
                  ? 'Freind Requested'
                  : 'Freind Request'}
              </Text>
            </Button>
          </Block>
          {!relations.isFriend && (
            <Button
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
          loading ? (
            <Loading />
          ) : (
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
          )
        ) : (
          <Block align="center" justify="center">
            <EmptyList type="private" text="This account is private" />
          </Block>
        )}
      </Block>
    </Block>
  );
}
