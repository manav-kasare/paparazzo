import {useRoute} from '@react-navigation/native';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {ActivityIndicator} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import * as Yup from 'yup';
import {Block, Button, Image, Input, Text} from '../components';
import {username} from '../constants/regex';
import {useData, useTheme} from '../hooks';
import {storeUser} from '../services/api';
import imageUpload from '../services/imageUpload';
import {storeJson} from '../services/store';
import {showToast} from '../services/toast';

export default function ProfileSetup() {
  const {sizes, colors, gradients, icons} = useTheme();
  const {handleUser} = useData();
  const [loading, setLoading] = useState(false);
  const route = useRoute<any>();

  const {email, userId} = route.params;

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
    const imageResponse = await imageUpload(userId, values.avatar);
    console.log('imageResponse', imageResponse);
    if (imageResponse.error) {
      setLoading(false);
      return showToast('error', 'Could not upload image!');
    }
    const payload = {
      username: values.username,
      email,
      avatar: imageResponse.data,
      followers: 0,
      following: 0,
      friends: 0,
    };
    const response = await storeUser(userId, payload);
    console.log('response', response);
    if (response.error) {
      setLoading(false);
      return showToast('error', 'Could not sign up!');
    }
    setLoading(false);
    handleUser(response.data);
    storeJson('user', response.data);
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
              align="center"
              justify="center"
              onPress={() => handleImage(setFieldValue)}
              style={{alignSelf: 'center'}}
              radius={sizes.avatarSize * 2}>
              {values.avatar ? (
                <Image
                  source={{uri: values.avatar}}
                  height={sizes.avatarSize * 4}
                  width={sizes.avatarSize * 4}
                  style={{alignSelf: 'center'}}
                  radius={sizes.avatarSize * 2}
                />
              ) : (
                <Image source={icons.image} height={20} width={20} radius={0} />
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
