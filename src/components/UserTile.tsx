import React from 'react';
import {useTheme} from '../hooks';
import {navigate} from '../services/navigation';
import Block from './Block';
import Button from './Button';
import Image from './Image';
import Text from './Text';

import Feather from 'react-native-vector-icons/Feather';

interface Props {
  id: string;
  username: string;
  avatar: string;
}

function UserTile({avatar, username, id}: Props) {
  const {sizes, colors} = useTheme();

  return (
    <Button
      onPress={() =>
        navigate('User', {
          userParam: {
            id,
            username,
            avatar,
          },
        })
      }
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

      <Feather name="chevron-right" size={sizes.md} color={colors.text} />
    </Button>
  );
}

export default React.memo(UserTile);
