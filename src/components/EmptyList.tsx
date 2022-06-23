import React from 'react';
import {useTheme} from '../hooks';
import Block from './Block';
import Button from './Button';
import Image from './Image';
import Text from './Text';

interface Props {
  text: string;
  sad?: boolean;
  type?: string;
  action?: () => void;
  actionText?: string;
}

function EmptyList({text, sad, type, action, actionText}: Props) {
  const {colors, sizes} = useTheme();
  const source =
    type === 'search'
      ? require('../assets/images/search.png')
      : type === 'private'
      ? require('../assets/images/private.png')
      : require('../assets/images/dawn.png');

  return (
    <Block
      flex={1}
      marginBottom={sizes.padding * 4}
      align="center"
      justify="center">
      {(sad || type) && <Image source={source} height={200} width={200} />}
      <Text color={colors.gray} marginTop={sizes.padding}>
        {text}
      </Text>
      {action && (
        <Button
          onPress={action}
          color={colors.card}
          marginTop={sizes.padding}
          paddingHorizontal={sizes.padding}>
          <Text>{actionText}</Text>
        </Button>
      )}
    </Block>
  );
}

export default React.memo(EmptyList);
