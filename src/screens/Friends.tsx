import React from 'react';
import {Block, Tile} from '../components';
import {useTheme} from '../hooks';
import {navigate} from '../services/navigation';

export default function Friends() {
  const {sizes} = useTheme();
  return (
    <Block paddingVertical={sizes.padding}>
      <Tile text="Requests" onPress={() => navigate('Requests')} />
    </Block>
  );
}
