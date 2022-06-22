import React from 'react';
import {IPost} from '../constants/types';
import {useTheme} from '../hooks';
import Block from './Block';
import Image from './Image';
import Text from './Text';

function Post({id, image, postedBy, user, caption}: IPost) {
  const {sizes, colors} = useTheme();

  return (
    <Block
      radius={sizes.cardRadius}
      color={colors.card}
      margin={sizes.padding}
      style={{alignSelf: 'center'}}>
      <Block
        padding={sizes.padding / 2}
        row
        align="center"
        justify="flex-start">
        <Image avatar source={{uri: user.avatar}} />
        <Text bold marginLeft={sizes.padding / 2}>
          {user.username}
        </Text>
      </Block>
      <Image
        source={{uri: image}}
        radius={0}
        height={sizes.width - sizes.padding}
        width={sizes.width - sizes.padding}
      />
      <Block padding={sizes.padding / 2}>
        <Text bold>🎥: {postedBy.username}</Text>
        {caption && <Text marginTop={sizes.padding}>{caption}</Text>}
      </Block>
    </Block>
  );
}

export default React.memo(Post);
