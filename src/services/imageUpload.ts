import storage from '@react-native-firebase/storage';

export default async (id: string, path: string) => {
  try {
    const reference = storage().ref(
      'avatars/' + id + '.' + path.split('.').slice(-1)[0],
    );
    console.log(
      'path',
      'avatars/' + id + '.' + path.split('.').slice(-1)[0],
      path,
    );
    const response = await reference.putFile(path);
    const url = await reference.getDownloadURL();
    console.log('url', url);
    return {data: url, error: null};
  } catch (error) {
    return {error, data: null};
  }
};
