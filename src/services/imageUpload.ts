import {RNS3} from 'react-native-aws3';
import storage from '@react-native-firebase/storage';

const options = {
  keyPrefix: 'avatars/',
  bucket: 'paparazzo',
  region: 'ap-south-1',
  accessKey: 'AKIAQITR7QMTUBVIRTTJ',
  secretKey: '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',
  successActionStatus: 201,
};

export default async (id: string, path: string) => {
  // try {
  //   const file = {
  //     uri: path,
  //     name: id + '.' + path.split('.').slice(-1)[0],
  //     type: 'image/' + path.split('.').slice(-1)[0],
  //   };
  //   console.log('uploading', file, options);
  //   const response: any = await RNS3.put(file, options);
  //   console.log(response.body);
  //   return {data: response.body, error: null};
  // } catch (error) {
  //   return {error, data: null};
  // }
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

// try {
//   const reference = storage().ref(
//     'avatars/' + id + '.' + path.split('.').slice(-1)[0],
//   );
//   console.log(
//     'path',
//     'avatars/' + id + '.' + path.split('.').slice(-1)[0],
//     path,
//   );
//   const response = await reference.putFile(path);
//   return {data: response, error: null};
// } catch (error) {
//   return {error, data: null};
// }
