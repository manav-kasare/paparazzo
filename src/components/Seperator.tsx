import {View, Text} from 'react-native';
import React from 'react';
import Block from './Block';
import {useTheme} from '../hooks';

function Seperator() {
  const {colors, sizes, gradients} = useTheme();
  return (
    <Block
      height={5}
      flex={0}
      radius={sizes.xxl}
      color={colors.background}
      gradient={gradients.primary}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
    />
  );
}

export default React.memo(Seperator);
