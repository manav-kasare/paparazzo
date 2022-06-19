import React from 'react';
import {IUser} from '../constants/types';
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
}

function UserTile({avatar, username, id, isFollowing}: Props) {
  const {sizes, colors} = useTheme();
  return (
    <Button
      flex={0}
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
        marginTop={sizes.padding}
        size={sizes.h5}
        lineHeight={sizes.h5}>
        {username}
      </Text>

      <Block
        row
        marginTop={sizes.padding}
        flex={0}
        justify="flex-start"
        align="center">
        <Button
          color={colors.background}
          flex={1}
          marginHorizontal={sizes.padding}
          paddingVertical={sizes.s}>
          <Text>{isFollowing ? 'Unfollow' : 'Follow'}</Text>
        </Button>
        <Button
          color={colors.background}
          marginHorizontal={sizes.padding}
          flex={1}
          paddingVertical={sizes.s}>
          <Text>Request</Text>
        </Button>
      </Block>
    </Button>
  );
}

export default React.memo(UserTile);
