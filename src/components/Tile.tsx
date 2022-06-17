import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {ITile} from '../constants/types';
import {useTheme} from '../hooks';
import Block from './Block';
import Button from './Button';
import Text from './Text';

function Tile({text, danger, onPress}: ITile) {
  const {sizes, colors} = useTheme();
  return (
    <Button
      onPress={onPress}
      flex={0}
      justify="space-between"
      align="center"
      row
      paddingVertical={sizes.m}
      paddingHorizontal={sizes.m}>
      <Text size={sizes.h5} lineHeight={sizes.h5} danger={danger}>
        {text}
      </Text>
      <Feather
        name="chevron-right"
        size={sizes.md}
        color={danger ? colors.danger : colors.text}
      />
    </Button>
  );
}

export default React.memo(Tile);