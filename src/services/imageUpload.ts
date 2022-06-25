import {RNS3} from 'react-native-aws3';

const options = {
  keyPrefix: 'avatars/',
  bucket: 'paparazzo',
  region: 'ap-south-1',
  accessKey: 'AKIAQITR7QMTRZ5RWN23',
  secretKey: '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',
  successActionStatus: 201,
};

export default async (name: string, path: string, type?: string) => {
  try {
    const file = {
      uri: path,
      name: name,
      type: 'image/' + path.split('.').slice(-1)[0],
    };
    const response: any = await RNS3.put(file, options);
    return {data: response.body.postResponse.location, error: null};
  } catch (error) {
    return {error, data: null};
  }
};
