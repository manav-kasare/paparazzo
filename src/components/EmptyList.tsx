import React from 'react';
import Block from './Block';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '../hooks';
import Text from './Text';
import Button from './Button';

interface Props {
  text: string;
  sad?: boolean;
  action?: () => void;
  actionText?: string;
}

function EmptyList({text, sad, action, actionText}: Props) {
  const {colors, sizes} = useTheme();
  return (
    <Block flex={1} align="center" justify="center">
      {sad && (
        <MaterialCommunityIcons
          name="emoticon-sad-outline"
          color={colors.gray}
          size={sizes.xl}
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
