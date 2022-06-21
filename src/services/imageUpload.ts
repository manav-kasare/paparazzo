import storage from '@react-native-firebase/storage';

export default async (id: string, path: string, type?: string) => {
  try {
    const reference = storage().ref(
      type && type === 'post'
        ? 'posts/' + id + '.' + path.split('.').slice(-1)[0]
        : 'avatars/' + id + '.' + path.split('.').slice(-1)[0],
    );
    await reference.putFile(path);
    const url = await reference.getDownloadURL();
    return {data: url, error: null};
  } catch (error) {
    return {error, data: null};
  }
};
