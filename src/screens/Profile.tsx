import React from 'react';
import {Block, Image, Text} from '../components';
import {useData, useTheme} from '../hooks';

export default function Profile() {
  const {user} = useData();
  const {sizes, gradients, colors} = useTheme();
  return (
    <Block>
      <Block
        color={colors.card}
        style={{
          borderBottomLeftRadius: sizes.socialRadius,
          borderBottomRightRadius: sizes.socialRadius,
        }}
        flex={0}>
        <Block
          flex={0}
          height={sizes.height * 0.13}
          width={sizes.height * 0.13}
          radius={(sizes.height * 0.13) / 2}
          color={colors.gray}
          style={{alignSelf: 'center'}}
          marginVertical={sizes.md}
          align="center"
          justify="center">
          <Image
            height={sizes.height * 0.125}
            width={sizes.height * 0.125}
            radius={(sizes.height * 0.125) / 2}
            source={{uri: user.avatar}}
          />
        </Block>

        <Text align="center" bold size={sizes.h4} lineHeight={sizes.h4}>
          {user.username}
        </Text>

        <Block paddingBottom={sizes.m} marginTop={sizes.s} flex={0} row>
          <Block align="center" justify="center" paddingVertical={sizes.m}>
            <Text size={sizes.h4} bold lineHeight={sizes.h4}>
              {user.followers}
            </Text>
            <Text>Followers</Text>
          </Block>
          <Block align="center" justify="center" paddingVertical={sizes.m}>
            <Text size={sizes.h4} bold lineHeight={sizes.h4}>
              {user.following}
            </Text>
            <Text>Following</Text>
          </Block>
          <Block align="center" justify="center" paddingVertical={sizes.m}>
            <Text size={sizes.h4} bold lineHeight={sizes.h4}>
              {user.friends}
            </Text>
            <Text>Friends</Text>
          </Block>
        </Block>
      </Block>

      <Block></Block>
    </Block>
  );
}
