import React from 'react';
import {useData, useTheme} from '../hooks';
import {
  handleAccept as handleAcceptFollow,
  handleReject as handleRejectFollow,
  handleRemove as handleRemoveFollower,
  handleUnfollow,
} from '../services/helpers/follows';
import {
  handleAccept as handleAcceptFriend,
  handleReject as handleRejectFriend,
  handleRemove as handleRemoveFriend,
} from '../services/helpers/friends';
import {navigate} from '../services/navigation';
import Block from './Block';
import Button from './Button';
import Image from './Image';
import Text from './Text';

interface Props {
  id: string;
  username: string;
  avatar: string;
  type: string;
  requestId: string;
}

function SmallUserTile({id, username, avatar, type, requestId}: Props) {
  const {sizes, colors} = useTheme();
  const {
    user,
    handleUser,
    followers,
    setFollowRequests,
    setFollowers,
    friends,
    setFriends,
    following,
    setFollowing,
    setFriendRequests,
  } = useData();

  const onPressRemove = () => {
    if (type === 'following') {
      handleUnfollow(user, id, handleUser, following, setFollowing);
    } else if (type === 'followers')
      handleRemoveFollower(user, id, handleUser, followers, setFollowers);
    else if (type === 'friends')
      handleRemoveFriend(id, requestId, friends, setFriends);
  };

  const _handleAccept = async () => {
    const remoteUser = {id, username, avatar};
    if (type == 'followRequest') {
      await handleAcceptFollow(
        user,
        remoteUser,
        handleUser,
        followers,
        setFollowers,
        setFollowRequests,
      );
    } else {
      await handleAcceptFriend(
        remoteUser,
        requestId,
        friends,
        setFriends,
        setFriendRequests,
      );
    }
  };

  const _handleReject = async () => {
    if (type == 'followRequest') {
      await handleRejectFollow(requestId, setFollowRequests);
    } else {
      await handleRejectFriend(id, requestId, friends, setFriends);
    }
  };

  const handleTilePress = () => {
    const remoteUser = {
      id,
      username,
      avatar,
    };
    navigate('User', {
      userParam: remoteUser,
    });
  };

  return (
    <Button
      onPress={handleTilePress}
      marginVertical={sizes.padding / 2}
      flex={0}
      style={{alignSelf: 'center'}}
      radius={sizes.cardRadius}
      color={colors.card}
      width={sizes.width * 0.95}
      paddingHorizontal={sizes.padding}
      paddingVertical={sizes.padding}>
      <Block row align="center">
        <Block
          flex={0}
          height={sizes.avatarSize + 3}
          width={sizes.avatarSize + 3}
          radius={(sizes.avatarSize + 3) / 2}
          color={colors.gray}
          align="center"
          justify="center">
          <Image
            height={sizes.avatarSize}
            width={sizes.avatarSize}
            radius={sizes.avatarRadius}
            source={{uri: avatar}}
          />
        </Block>
        <Text
          bold
          marginLeft={sizes.padding}
          size={sizes.h5}
          lineHeight={sizes.h5}>
          {username}
        </Text>
        <Block flex={1} align="flex-end">
          {type === 'following' ? (
            <Button
              color={colors.background}
              flex={0}
              paddingHorizontal={sizes.m}
              onPress={onPressRemove}
              paddingVertical={sizes.s}>
              <Text>Unfollow</Text>
            </Button>
          ) : type === 'followers' ? (
            <Button
              color={colors.background}
              flex={0}
              paddingHorizontal={sizes.m}
              onPress={onPressRemove}
              paddingVertical={sizes.s}>
              <Text>Remove</Text>
            </Button>
          ) : type === 'followRequest' || type === 'friendRequest' ? (
            <Block row flex={0}>
              <Button
                color={colors.background}
                flex={0}
                paddingHorizontal={sizes.m}
                onPress={_handleAccept}
                paddingVertical={sizes.s}>
                <Text>Accept</Text>
              </Button>
              <Button
                color={colors.background}
                flex={0}
                marginLeft={sizes.padding / 2}
                paddingHorizontal={sizes.m}
                onPress={_handleReject}
                paddingVertical={sizes.s}>
                <Text>Reject</Text>
              </Button>
            </Block>
          ) : (
            <Button
              color={colors.background}
              flex={0}
              paddingHorizontal={sizes.m}
              onPress={onPressRemove}
              paddingVertical={sizes.s}>
              <Text>Remove</Text>
            </Button>
          )}
        </Block>
      </Block>
    </Button>
  );
}

export default React.memo(SmallUserTile);
