import React from 'react';
import {useTheme} from '../hooks';
import Block from './Block';
import Button from './Button';
import Image from './Image';
import Text from './Text';

interface Props {
  id: string;
  username: string;
  avatar: string;
  email: string;
  followers: number;
  following: number;
  friends: number;
  private?: boolean;
  isFollowing?: boolean;
  isFriend?: boolean;
  requested?: boolean;
  handleFollow?: (remoteUser: any) => void;
  handleUnfollow?: (remoteUser: any) => void;
  handleSendRequest?: (remoteUser: any) => void;
  handleRemoveRequest?: (remoteUser: any) => void;
  handleRemoveFriend?: (remoteUser: any) => void;
}

function UserTile({
  avatar,
  username,
  id,
  isFollowing,
  handleFollow,
  handleUnfollow,
  isFriend,
  handleSendRequest,
  handleRemoveRequest,
  handleRemoveFriend,
  requested,
}: Props) {
  const {sizes, colors} = useTheme();

  const onPress = () => {
    const remoteUser = {id, username, avatar};
    if (isFollowing) {
      handleUnfollow && handleUnfollow(remoteUser);
    } else {
      handleFollow && handleFollow(remoteUser);
    }
  };

  const onPressRequest = () => {
    const remoteUser = {id, username, avatar};
    if (isFriend) {
      handleRemoveFriend && handleRemoveFriend(remoteUser);
    }
    if (requested) {
      handleRemoveRequest && handleRemoveRequest(remoteUser);
    } else {
      handleSendRequest && handleSendRequest(remoteUser);
    }
  };

  return (
    <Button
      flex={0}
      row
      align="center"
      marginVertical={sizes.padding / 2}
      style={{alignSelf: 'center'}}
      radius={sizes.cardRadius}
      color={colors.card}
      width={sizes.width * 0.95}
      paddingHorizontal={sizes.padding}
      paddingVertical={sizes.padding}>
      <Block
        flex={0}
        height={sizes.avatarSize + 3}
        width={sizes.avatarSize + 3}
        radius={(sizes.avatarSize + 3) / 2}
        color={colors.gray}
        align="center"
        justify="center">
        <Image avatar source={{uri: avatar}} />
      </Block>
      <Text
        bold
        marginLeft={sizes.padding / 2}
        size={sizes.h5}
        lineHeight={sizes.h5}>
        {username}
      </Text>

      <Block />

      <Button
        color={colors.background}
        flex={0}
        onPress={onPress}
        paddingHorizontal={sizes.padding}>
        <Text>{isFollowing ? 'Unfollow' : 'Follow'}</Text>
      </Button>
      <Button
        onPress={onPressRequest}
        color={colors.background}
        marginLeft={sizes.padding / 2}
        flex={0}
        paddingHorizontal={sizes.padding}>
        <Text>{isFriend ? 'Friend' : requested ? 'Requested' : 'Request'}</Text>
      </Button>
    </Button>
  );
}

export default React.memo(UserTile);
