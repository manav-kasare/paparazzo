import React, {useState} from 'react';
import {Block, Button, Image, Input, Text} from '../components';
import {useData, useTheme} from '../hooks';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import {useRoute} from '@react-navigation/native';
import imageUpload from '../services/imageUpload';
import {showToast} from '../services/toast';
import getRandomId from '../services/getRandomId';
import {post} from '../services/api';
import {ActivityIndicator} from 'react-native';
import {goBack} from '../services/navigation';
import {IPost} from '../constants/types';

export default function CreatePost() {
  const [image, setImage] = useState<string | undefined>(undefined);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const maxCaption = 100;

  const {sizes, colors} = useTheme();
  const {user} = useData();
  const route = useRoute();
  const {remoteUser}: any = route.params;
  const {id} = remoteUser;

  const handleImage = async () => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      mediaType: 'photo',
      multiple: false,
      cropping: true,
    })
      .then(image => {
        setImage(image.path);
      })
      .catch(() => {});
  };

  const handlePost = async () => {
    if (!image) return;
    setLoading(true);
    const postId = getRandomId();
    const imageResponse = await imageUpload(postId, image, 'posts');
    if (imageResponse.error) {
      setLoading(false);
      return showToast('error', 'Could not upload image!');
    }
    const payload = {
      ...(caption.length && {caption}),
      id: postId,
      image: imageResponse.data,
      user: {
        id,
        username: remoteUser.username,
        avatar: remoteUser.avatar,
      },
      postedBy: {
        id: user.id,
        username: user.username,
      },
    } as IPost;
    const response = await post(postId, payload);
    console.log('response', response);
    setLoading(false);
    if (response.error)
      return showToast('error', 'Something went wrong while posting!');
    showToast('success', 'Posted successfully!');
    goBack();
  };

  const onChangeText = (e: string) => {
    if (caption.length < maxCaption) {
      return setCaption(e);
    }
  };

  return (
    <Block align="center">
      <Button
        flex={0}
        onPress={handleImage}
        align="center"
        justify="center"
        marginTop={sizes.padding}
        radius={sizes.cardRadius}
        color={colors.card}
        width={sizes.width * 0.9}
        height={sizes.width * 0.9}>
        {image ? (
          <Image
            source={{uri: image}}
            width={sizes.width * 0.9}
            height={sizes.width * 0.9}
          />
        ) : (
          <Ionicons name="image" color={colors.text} size={sizes.xl} />
        )}
      </Button>
      <Block
        keyboard
        flex={1}
        width={sizes.width}
        paddingHorizontal={sizes.width * 0.05}
        paddingVertical={sizes.padding * 2}>
        <Input
          multiline
          value={caption}
          onChangeText={onChangeText}
          placeholder="Type caption here"
        />
        <Text marginTop={sizes.padding / 2}>
          [{caption.length} / {maxCaption}]
        </Text>
        <Button
          disabled={loading}
          onPress={handlePost}
          marginTop={sizes.padding}
          color={colors.card}>
          {loading ? (
            <ActivityIndicator color={colors.text} size={sizes.p} />
          ) : (
            <Text>Post</Text>
          )}
        </Button>
      </Block>
    </Block>
  );
}
