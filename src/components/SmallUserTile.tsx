import React from 'react';
import {useData, useTheme} from '../hooks';
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
  requestId?: string;
  handleUnfollow?: (remoteUser: any) => void;
  handleRemoveFollower?: (remoteUser: any) => void;
  handleRemoveFriend?: (remoteUser: any) => void;
  handleAccept?: (remoteUser: any, requestId?: string) => void;
  handleReject?: (remoteUser: any, requestId?: string) => void;
}

function SmallUserTile({
  id,
  username,
  avatar,
  handleUnfollow,
  handleRemoveFollower,
  handleRemoveFriend,
  type,
  requestId,
  handleAccept,
  handleReject,
}: Props) {
  const {sizes, colors} = useTheme();

  const onPress = () => {
    const remoteUser = {id, username, avatar};
    if (type === 'following') handleUnfollow && handleUnfollow(remoteUser);
    else if (type === 'followers')
      handleRemoveFollower && handleRemoveFollower(remoteUser);
    else if (type === 'friends')
      handleRemoveFriend && handleRemoveFriend(remoteUser);
  };

  const _handleAccept = () => {
    const remoteUser = {id, username, avatar};
    handleAccept && handleAccept(remoteUser, requestId);
  };

  const _handleReject = () => {
    const remoteUser = {id, username, avatar};
    handleReject && handleReject(remoteUser, requestId);
  };

  const handleTilePress = () => {
    const remoteUser = {
      id,
      username,
      avatar,
    };
    navigate('User', {
      userParam: remoteUser,
      isFriend: type === 'friends',
      halfUser: true,
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
              onPress={onPress}
              paddingVertical={sizes.s}>
              <Text>Unfollow</Text>
            </Button>
          ) : type === 'followers' ? (
            <Button
              color={colors.background}
              flex={0}
              paddingHorizontal={sizes.m}
              onPress={onPress}
              paddingVertical={sizes.s}>
              <Text>Remove</Text>
            </Button>
          ) : type === 'request' ? (
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
              onPress={onPress}
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
