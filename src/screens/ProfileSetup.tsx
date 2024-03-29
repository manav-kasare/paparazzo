import {useRoute} from '@react-navigation/native';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {ActivityIndicator} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Yup from 'yup';
import {Block, Button, Image, Input, Text} from '../components';
import {username} from '../constants/regex';
import {useData, useTheme} from '../hooks';
import {api} from '../services/api';
import {getToken} from '../services/fcm';
import imageUpload from '../services/imageUpload';
import {storeString} from '../services/store';
import {showToast} from '../services/toast';

export default function ProfileSetup() {
  const {sizes, colors, gradients, icons} = useTheme();
  const {handleUser, setToken} = useData();
  const [loading, setLoading] = useState(false);
  const route = useRoute<any>();

  const {email, password} = route.params;

  const initialValues = {
    username: '',
    avatar: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .matches(username, 'Invalid username!')
      .required('Please enter a username'),
    avatar: Yup.string().required('Please choose an avatar'),
  });

  const handleImage = async (setFieldValue: any) => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      mediaType: 'photo',
      multiple: false,
      cropping: true,
    })
      .then(image => {
        setFieldValue('avatar', image.path);
      })
      .catch(() => {});
  };

  const onSubmit = async (values: any) => {
    setLoading(true);
    const imageResponse = await imageUpload(email, values.avatar);
    if (imageResponse.error) {
      setLoading(false);
      return showToast('error', 'Could not upload image. Please Try again');
    }
    const fcm = await getToken();
    const payload = {
      email,
      password,
      fcm,
      username: values.username,
      avatar: imageResponse.data,
      followers: 0,
      following: 0,
      friends: 0,
      isPrivate: true,
    };
    const response = await api.users.signup(payload);
    console.log('response', response);
    if (response.error) {
      setLoading(false);
      return showToast('error', response.error);
    }
    setLoading(false);
    handleUser(response.data.user);
    setToken(response.data.token);
    storeString('token', response.data.token);
    return showToast('success', 'Registered successfully!');
  };

  return (
    <Block paddingHorizontal={sizes.m} paddingVertical={sizes.sm}>
      <Text size={sizes.h3} bold lineHeight={sizes.h2}>
        Setup your Profile
      </Text>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        {({handleChange, handleSubmit, values, errors, setFieldValue}) => (
          <Block keyboard marginVertical={sizes.md}>
            <Button
              gradient={gradients.primary}
              height={sizes.avatarSize * 4}
              width={sizes.avatarSize * 4}
              radius={sizes.avatarSize * 2}
              align="center"
              justify="center"
              onPress={() => handleImage(setFieldValue)}
              style={{alignSelf: 'center'}}>
              {values.avatar ? (
                <Image
                  source={{uri: values.avatar}}
                  height={sizes.avatarSize * 4}
                  width={sizes.avatarSize * 4}
                  radius={sizes.avatarSize * 2}
                  style={{alignSelf: 'center'}}
                />
              ) : (
                <Ionicons name="image" color={colors.text} size={sizes.md} />
              )}
            </Button>

            {errors.avatar && (
              <Text size={sizes.sm} align="center" danger>
                {errors.avatar}
              </Text>
            )}

            <Input
              label="Username"
              onChangeText={handleChange('username')}
              value={values.username}
              style={{color: colors.text}}
              marginBottom={sizes.s}
              marginTop={sizes.md}
              danger={errors.username ? true : false}
            />
            {errors.username && (
              <Text size={sizes.sm} danger>
                {errors.username}
              </Text>
            )}

            <Button
              disabled={loading}
              marginTop={sizes.sm}
              onPress={handleSubmit}
              gradient={gradients.primary}
              haptic>
              {loading ? (
                <ActivityIndicator color={colors.text} />
              ) : (
                <Text size={sizes.sm}>Register</Text>
              )}
            </Button>
          </Block>
        )}
      </Formik>
    </Block>
  );
}
