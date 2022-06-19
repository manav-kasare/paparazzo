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
  isFollowing?: boolean;
  handleUnfollow?: (remoteUser: any) => void;
}

function SmallUserTile({
  id,
  username,
  avatar,
  isFollowing,
  handleUnfollow,
}: Props) {
  const {sizes, colors} = useTheme();

  const onPress = () => {
    const remoteUser = {id, username, avatar};
    handleUnfollow && handleUnfollow(remoteUser);
  };

  return (
    <Block
      marginVertical={sizes.padding / 2}
      flex={0}
      style={{alignSelf: 'center'}}
      radius={sizes.cardRadius}
      color={colors.card}
      width={sizes.width * 0.95}
      paddingHorizontal={sizes.padding}
      paddingVertical={sizes.padding}>
      <Block row align="center">
        <Image
          height={sizes.avatarSize * 0.75}
          width={sizes.avatarSize * 0.75}
          radius={sizes.avatarRadius * 0.75}
          source={{uri: avatar}}
        />
        <Text
          bold
          marginLeft={sizes.padding}
          size={sizes.h5}
          lineHeight={sizes.h5}>
          {username}
        </Text>
        <Block flex={1} align="flex-end">
          <Button
            color={colors.background}
            flex={0}
            paddingHorizontal={sizes.m}
            onPress={onPress}
            paddingVertical={sizes.s}>
            <Text>{isFollowing ? 'Unfollow' : 'Follow'}</Text>
          </Button>
        </Block>
      </Block>
    </Block>
  );
}

export default React.memo(SmallUserTile);
