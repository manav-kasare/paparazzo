import {useRoute} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {Block, Button, Text} from '../components';
import {useTheme} from '../hooks';

import OtpInputs, {OtpInputsRef} from 'react-native-otp-inputs';
import {TouchableOpacity} from 'react-native';
import {showToast} from '../services/toast';
import {navigate} from '../services/navigation';

export default function Verification() {
  const route = useRoute();
  const {code, email, password}: any = route.params;
  const [_code, _setCode] = useState('');
  const [cooldown, setCooldown] = useState(60);
  const interval = useRef<NodeJS.Timer>();
  const otpRef = useRef<OtpInputsRef>();

  useEffect(() => {
    interval.current = setInterval(() => {
      setCooldown(prev => prev - 1);
    }, 1000);
    return () => {
      setCooldown(60);
    };
  }, []);

  useEffect(() => {
    if (cooldown === 0) clearInterval(interval.current);
  }, [cooldown]);

  const {sizes, colors} = useTheme();

  const onPress = async () => {
    if (String(code) !== _code) return showToast('error', 'Wrong code');
    showToast('success', 'Verified successfully!');
    return navigate('ProfileSetup', {
      email,
      password,
    });
  };

  const handleClear = () => {
    otpRef.current?.reset();
  };

  return (
    <Block padding={sizes.padding}>
      <Block flex={0}>
        <Text size={sizes.p}>
          We have sent you a verification code on {email}
        </Text>
        <Text size={sizes.p} bold marginTop={sizes.padding}>
          Enter verification code below
        </Text>
      </Block>

      <Block flex={0} paddingVertical={sizes.padding * 2}>
        <OtpInputs
          ref={otpRef}
          handleChange={e => _setCode(e)}
          numberOfInputs={6}
          autofillFromClipboard={false}
          inputStyles={{
            backgroundColor: colors.card,
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: sizes.m,
          }}
          style={{
            alignItems: 'center',
            flexDirection: 'row',
          }}
          inputContainerStyles={{
            backgroundColor: colors.card,
            marginHorizontal: sizes.s,
            height: sizes.xxl,
            width: sizes.xxl,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
        <TouchableOpacity
          onPress={handleClear}
          style={{marginTop: sizes.p, marginLeft: sizes.s}}>
          <Text bold size={sizes.p}>
            Clear
          </Text>
        </TouchableOpacity>
        <Block flex={0} marginTop={sizes.padding * 2}>
          <Button
            onPress={onPress}
            marginVertical={sizes.padding / 2}
            marginHorizontal={sizes.padding / 2}
            color={colors.card}>
            <Text>Submit</Text>
          </Button>
          <Button
            disabled={cooldown !== 0}
            marginVertical={sizes.padding / 2}
            marginHorizontal={sizes.padding / 2}
            color={colors.card}>
            <Text>{cooldown !== 0 ? `Resend in ${cooldown}` : 'Resend'}</Text>
          </Button>
        </Block>
      </Block>
    </Block>
  );
}
