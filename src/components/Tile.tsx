import React from 'react';
import {Switch} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {ITile} from '../constants/types';
import {useTheme} from '../hooks';
import Button from './Button';
import Text from './Text';

function Tile({text, danger, _switch, onPress, switchActive, right}: ITile) {
  const {sizes, colors} = useTheme();
  return (
    <Button
      onPress={onPress}
      flex={0}
      color={colors.card}
      width={sizes.width * 0.95}
      justify="space-between"
      style={{alignSelf: 'center'}}
      marginVertical={sizes.padding / 2}
      align="center"
      row
      paddingVertical={sizes.p}
      paddingHorizontal={sizes.m}>
      <Text size={sizes.h5} lineHeight={sizes.h5} danger={danger}>
        {text}
      </Text>
      {right ? (
        right
      ) : _switch ? (
        <Switch
          thumbColor={colors.primary}
          ios_backgroundColor={colors.primary}
          onValueChange={onPress}
          value={switchActive}
        />
      ) : (
        <Feather
          name="chevron-right"
          size={sizes.md}
          color={danger ? colors.danger : colors.text}
        />
      )}
    </Button>
  );
}

export default React.memo(Tile);
