import React from 'react';
import {useTheme} from '../hooks';
import Block from './Block';
import Button from './Button';
import Image from './Image';
import Text from './Text';

interface Props {
  text: string;
  sad?: boolean;
  search?: boolean;
  action?: () => void;
  actionText?: string;
}

function EmptyList({text, sad, search, action, actionText}: Props) {
  const {colors, sizes} = useTheme();
  return (
    <Block
      flex={1}
      marginBottom={sizes.padding * 4}
      align="center"
      justify="center">
      {(sad || search) && (
        <Image
          source={
            search
              ? require('../assets/images/search.png')
              : require('../assets/images/dawn.png')
          }
          height={200}
          width={200}
        />
      )}
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
