import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Block, Button, Image, Text} from '../components';
import {IUser} from '../constants/types';
import {useTheme} from '../hooks';

export default function User() {
  const {sizes, colors} = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const {userParam}: any = route.params;
  const {id, username, avatar, isPrivate, followers, following, friends} =
    userParam;

  return (
    <Block>
      <Block
        color={colors.card}
        style={{
          borderBottomLeftRadius: sizes.cardRadius,
          borderBottomRightRadius: sizes.cardRadius,
        }}
        flex={0}>
        <Block
          flex={0}
          height={sizes.height * 0.13}
          width={sizes.height * 0.13}
          radius={(sizes.height * 0.13) / 2}
          color={colors.gray}
          style={{alignSelf: 'center'}}
          marginVertical={sizes.padding}
          align="center"
          justify="center">
          <Image
            height={sizes.height * 0.125}
            width={sizes.height * 0.125}
            radius={(sizes.height * 0.125) / 2}
            source={{uri: avatar}}
          />
        </Block>

        <Text align="center" bold size={sizes.h4} lineHeight={sizes.h4}>
          {username}
        </Text>

        <Block
          marginHorizontal={sizes.padding}
          paddingBottom={sizes.m}
          marginTop={sizes.s}
          flex={0}
          row>
          <Button
            flex={1}
            align="center"
            justify="center"
            paddingVertical={sizes.m}>
            <Text size={sizes.h4} bold lineHeight={sizes.h4}>
              {followers}
            </Text>
            <Text>Followers</Text>
          </Button>
          <Button
            flex={1}
            align="center"
            justify="center"
            paddingVertical={sizes.m}>
            <Text size={sizes.h4} bold lineHeight={sizes.h4}>
              {following}
            </Text>
            <Text>Following</Text>
          </Button>
          <Button
            flex={1}
            align="center"
            justify="center"
            paddingVertical={sizes.m}>
            <Text size={sizes.h4} bold lineHeight={sizes.h4}>
              {friends}
            </Text>
            <Text>Friends</Text>
          </Button>
        </Block>
      </Block>

      <Block></Block>
    </Block>
  );
}
