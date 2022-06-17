import React from 'react';
import {Block, Tile} from '../components';
import {useData} from '../hooks';
import {removeItem} from '../services/store';
import auth from '@react-native-firebase/auth';

export default function Settings() {
  const {handleUser} = useData();
  const signOut = async () => {
    handleUser(undefined);
    await removeItem('user');
    await auth().signOut();
  };

  return (
    <Block>
      <Tile onPress={signOut} text="Sign out" danger />
    </Block>
  );
}
