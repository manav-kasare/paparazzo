import React, {useState} from 'react';
import {Block, Button, Input, Seperator, Text} from '../components';
import {useTheme} from '../hooks';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {StatusBar} from 'react-native';

export default function Onboard() {
  const {colors, sizes, gradients} = useTheme();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    password: Yup.string()
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  });

  const onSubmit = async () => {};

  return (
    <Block
      flex={1}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}
      gradient={gradients.primary}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <Text logo marginVertical={sizes.xxl} align="center">
        Paparazzo
      </Text>

      <Block
        flex={1}
        color={colors.background}
        paddingVertical={sizes.l}
        paddingHorizontal={sizes.m}
        style={{
          borderTopRightRadius: sizes.cardRadius,
          borderTopLeftRadius: sizes.cardRadius,
        }}>
        <Text bold marginBottom={sizes.s} size={sizes.sm} lineHeight={sizes.sm}>
          Welcome to Paparazzo!
        </Text>
        <Text bold size={sizes.sm} lineHeight={sizes.sm}>
          Register/Login with your credentials here
        </Text>
        <Block marginVertical={sizes.m} flex={0}>
          <Seperator />
        </Block>
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={onSubmit}>
          {({handleChange, handleBlur, handleSubmit, values, errors}) => (
            <Block keyboard>
              <Input
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                label="Email"
                style={{color: colors.text}}
                marginBottom={sizes.s}
                danger={errors.email ? true : false}
              />
              {errors.email && (
                <Text size={sizes.sm} danger>
                  {errors.email}
                </Text>
              )}
              <Input
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                label="Password"
                color={colors.text}
                marginTop={sizes.sm}
                marginBottom={sizes.s}
                danger={errors.password ? true : false}
                secureTextEntry={true}
              />
              {errors.password && (
                <Text size={sizes.sm} danger>
                  {errors.password}
                </Text>
              )}
              <Button
                marginTop={sizes.sm}
                onPress={handleSubmit}
                gradient={gradients.primary}>
                <Text size={sizes.sm}>Submit</Text>
              </Button>
            </Block>
          )}
        </Formik>
      </Block>
    </Block>
  );
}
