import React from 'react';
import {ActivityIndicator} from 'react-native';
import {useTheme} from '../hooks';
import Block from './Block';

function Loading() {
  const {colors, sizes} = useTheme();
  return (
    <Block align="center" justify="center">
      <ActivityIndicator color={colors.text} size={sizes.m} />
    </Block>
  );
}

export default React.memo(Loading);
