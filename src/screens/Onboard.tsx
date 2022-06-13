import {Formik, FormikValues} from 'formik';
import React, {useState} from 'react';
import {ActivityIndicator, StatusBar} from 'react-native';
import * as Yup from 'yup';
import {Block, Button, Input, Seperator, Text} from '../components';
import {useTheme} from '../hooks';
import {authenticate} from '../services/api';
import {showToast} from '../services/toast';

export default function Onboard() {
  const {colors, sizes, gradients} = useTheme();

  const [loading, setLoading] = useState(false);

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

  const onSubmit = async (values: FormikValues) => {
    setLoading(true);
    const response = await authenticate(values.email, values.password);
    console.log('authenticate', response);
    if (response.error) {
      setLoading(false);
      showToast('error', response.error);
    }
    setLoading(false);
  };

  return (
    <Block flex={1} gradient={gradients.primary}>
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
                disabled={loading}
                marginTop={sizes.sm}
                onPress={handleSubmit}
                gradient={gradients.primary}>
                {loading ? (
                  <ActivityIndicator color={colors.text} />
                ) : (
                  <Text size={sizes.sm}>Submit</Text>
                )}
              </Button>
            </Block>
          )}
        </Formik>
      </Block>
    </Block>
  );
}
