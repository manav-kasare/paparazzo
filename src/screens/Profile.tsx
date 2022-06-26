import React, {useEffect, useState} from 'react';
import {Block, Button, Image, PostTile, Text} from '../components';
import {useData, useTheme} from '../hooks';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import {ActivityIndicator, FlatList} from 'react-native';
import imageUpload from '../services/imageUpload';
import {showToast} from '../services/toast';
import {storeJson} from '../services/store';
import {navigate} from '../services/navigation';
import {IPost} from '../constants/types';
import Post from '../components/Post';
import EmptyList from '../components/EmptyList';
import {users} from '../services/api';

export default function Profile() {
  const {user, handleUser} = useData();
  const {sizes, colors} = useTheme();
  const [imageChanged, setImageChanged] = useState(false);
  const [avatar, setAvatar] = useState(user.avatar);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    handleGetPosts();
  }, []);

  const handleGetPosts = async () => {
    // const response = await getPosts(user.id);
    // if (response.error) return showToast('error', 'Could not get posts');
    // setPosts(response.data ? response.data : []);
  };

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
    console.log('image', imageResponse);
    if (imageResponse.error) {
      setLoading(false);
      return showToast('error', 'Could not upload image!');
    }
    const payload = {
      avatar: imageResponse.data,
    };
    const response = await users.update(payload);
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

  const renderItem = ({item}: {item: IPost}) => (
    <Button
      onPress={() => navigate('Posts', {posts, item})}
      marginHorizontal={sizes.width * 0.025 * 0.5}
      marginVertical={sizes.width * 0.025 * 0.5}
      width={sizes.width * 0.475}
      height={sizes.width * 0.475}>
      <Image
        height={sizes.width * 0.475}
        width={sizes.width * 0.475}
        resizeMode="contain"
        source={{uri: item.image}}
      />
    </Button>
  );

  return (
    <Block>
      <Block
        color={colors.card}
        paddingHorizontal={sizes.padding}
        paddingVertical={sizes.padding}
        flex={0}>
        <Block flex={0} row>
          <Block flex={0}>
            <Button
              flex={0}
              onPress={handleImage}
              height={sizes.avatarSize * 1.6}
              width={sizes.avatarSize * 1.6}
              radius={sizes.avatarRadius * 1.6}
              color={colors.gray}
              marginTop={-sizes.padding / 2}
              style={{alignSelf: 'center'}}
              align="center"
              justify="center">
              <Image
                height={sizes.avatarSize * 1.5}
                width={sizes.avatarSize * 1.5}
                radius={sizes.avatarRadius * 1.5}
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
                right={0}>
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

            <Text
              align="center"
              bold
              size={sizes.h5}
              marginTop={sizes.padding}
              lineHeight={sizes.h5}>
              {user.username}
            </Text>
          </Block>
          <Block marginHorizontal={sizes.padding} paddingBottom={sizes.m} row>
            <Button
              onPress={() => navigate('Followers')}
              flex={1}
              align="center"
              justify="center"
              paddingVertical={sizes.m}>
              <Text size={sizes.h4} bold lineHeight={sizes.h4}>
                {user.followers}
              </Text>
              <Text>Followers</Text>
            </Button>
            <Button
              onPress={() => navigate('Following')}
              flex={1}
              align="center"
              justify="center"
              paddingVertical={sizes.m}>
              <Text size={sizes.h4} bold lineHeight={sizes.h4}>
                {user.following}
              </Text>
              <Text>Following</Text>
            </Button>
            <Button
              onPress={() => navigate('Friends')}
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
      </Block>

      <Block>
        <FlatList
          style={{marginBottom: sizes.padding * 3}}
          data={posts}
          renderItem={renderItem}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={(!posts || !posts.length) && {flex: 1}}
          ListEmptyComponent={() => (
            <EmptyList sad text="You dont have any posts yet" />
          )}
        />
      </Block>
    </Block>
  );
}
