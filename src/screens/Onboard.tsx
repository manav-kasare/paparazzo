import {Formik, FormikValues} from 'formik';
import React, {useState} from 'react';
import {ActivityIndicator} from 'react-native';
import * as Yup from 'yup';
import {Block, Button, Input, Seperator, Text} from '../components';
import {useData, useTheme} from '../hooks';
import {api, setHeader} from '../services/api';
import {navigate} from '../services/navigation';
import {storeString} from '../services/store';
import {showToast} from '../services/toast';

export default function Onboard() {
  const {colors, sizes, gradients, fonts} = useTheme();
  const {handleUser, setToken} = useData();

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
    const payload = {
      email: values.email,
      password: values.password,
    };
    const response = await api.users.authenticate(payload);
    console.log('response', response);
    if (response.error) {
      setLoading(false);
      return showToast('error', response.error);
    }
    if (!response.data.loggedIn) {
      setLoading(false);
      return navigate('Verification', {
        code: response.data.code,
        email: values.email,
        password: values.password,
      });
    }
    setToken(response.data.token);
    handleUser(response.data.user);
    setLoading(false);
    setHeader(response.data.token);
    storeString('token', response.data.token);
  };

  return (
    <Block flex={1}>
      <Text
        marginTop={sizes.height * 0.1}
        marginBottom={sizes.height * 0.05}
        size={sizes.h1 * 1.25}
        lineHeight={sizes.h1 * 1.25}
        bold
        font={fonts.extrabold}
        align="center">
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
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <Block keyboard>
              <Input
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                label="Email"
                style={{color: colors.text}}
                marginBottom={sizes.s}
                danger={errors.email && touched.email ? true : false}
              />
              {errors.email && touched.email && (
                <Text gradient={gradients.danger} size={sizes.sm} danger>
                  {errors.email}
                </Text>
              )}
              <Input
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                label="Password"
                marginTop={sizes.sm}
                marginBottom={sizes.s}
                danger={errors.password && touched.password ? true : false}
                secureTextEntry={true}
              />
              {errors.password && touched.password && (
                <Text gradient={gradients.danger} size={sizes.sm} danger>
                  {errors.password}
                </Text>
              )}
              <Button
                disabled={loading}
                marginTop={sizes.sm}
                onPress={handleSubmit}
                haptic
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
