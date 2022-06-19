import React, {useState} from 'react';
import {Block, Button, Image, Text} from '../components';
import {useData, useTheme} from '../hooks';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import {ActivityIndicator} from 'react-native';
import imageUpload from '../services/imageUpload';
import {showToast} from '../services/toast';
import {updateDoc} from '../services/api';
import {storeJson} from '../services/store';
import {navigate} from '../services/navigation';

export default function Profile() {
  const {user, handleUser} = useData();
  const {sizes, colors} = useTheme();
  const [imageChanged, setImageChanged] = useState(false);
  const [avatar, setAvatar] = useState(user.avatar);
  const [loading, setLoading] = useState(false);

  const handleImage = () => {
    if (imageChanged) return handleUploadImage();
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      mediaType: 'photo',
      multiple: false,
      cropping: true,
    })
      .then(image => {
        setImageChanged(true);
        setAvatar(image.path);
      })
      .catch(() => {});
  };

  const handleUploadImage = async () => {
    setLoading(true);
    const imageResponse: any = await imageUpload(user.id, avatar);
    if (imageResponse.error) {
      setLoading(false);
      return showToast('error', 'Could not upload image!');
    }
    const payload = {
      avatar: imageResponse.data,
    };
    const response = await updateDoc('users', user.id, payload);
    console.log('response', response);
    if (response.error) {
      setLoading(false);
      return showToast('error', 'Could not update image!');
    }
    setLoading(false);
    handleUser({...user, ...payload});
    setImageChanged(false);
    showToast('success', 'Avatar updated!');
    await storeJson('user', {...user, ...payload});
  };

  return (
    <Block>
      <Block
        color={colors.card}
        style={{
          borderBottomLeftRadius: sizes.cardRadius,
          borderBottomRightRadius: sizes.cardRadius,
        }}
        flex={0}>
        <Button
          onPress={handleImage}
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
          <Block
            radius={sizes.m * 0.5}
            height={sizes.m}
            width={sizes.m}
            color={colors.white}
            position="absolute"
            align="center"
            justify="center"
            bottom={0}
            right={10}>
            {loading ? (
              <ActivityIndicator color={colors.background} size={14} />
            ) : imageChanged ? (
              <Ionicons
                name="cloud-upload-outline"
                color={colors.background}
                size={15}
              />
            ) : (
              <Ionicons name="pencil" color={colors.background} size={15} />
            )}
          </Block>
        </Button>

        <Text align="center" bold size={sizes.h4} lineHeight={sizes.h4}>
          {user.username}
        </Text>

        <Block
          marginHorizontal={sizes.padding}
          paddingBottom={sizes.m}
          marginTop={sizes.s}
          flex={0}
          row>
          <Button
            flex={1}
            onPress={() => navigate('Followers')}
            align="center"
            justify="center"
            paddingVertical={sizes.m}>
            <Text size={sizes.h4} bold lineHeight={sizes.h4}>
              {user.followers}
            </Text>
            <Text>Followers</Text>
          </Button>
          <Button
            flex={1}
            onPress={() => navigate('Following')}
            align="center"
            justify="center"
            paddingVertical={sizes.m}>
            <Text size={sizes.h4} bold lineHeight={sizes.h4}>
              {user.following}
            </Text>
            <Text>Following</Text>
          </Button>
          <Button
            flex={1}
            align="center"
            justify="center"
            paddingVertical={sizes.m}>
            <Text size={sizes.h4} bold lineHeight={sizes.h4}>
              {user.friends}
            </Text>
            <Text>Friends</Text>
          </Button>
        </Block>
      </Block>

      <Block></Block>
    </Block>
  );
}
