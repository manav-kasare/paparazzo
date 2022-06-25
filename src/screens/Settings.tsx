import React, {useState} from 'react';
import {Block, Tile} from '../components';
import {useData, useTheme} from '../hooks';
import {users} from '../services/api';
import {removeItem} from '../services/store';

export default function Settings() {
  const {
    handleUser,
    user,
    setFollowers,
    setFollowing,
    setFriends,
    setRequests,
    setToken,
  } = useData();
  const {sizes} = useTheme();
  const [isPrivate, setIsPrivate] = useState(user.private);

  const signOut = async () => {
    handleUser(undefined);
    setToken(undefined);
    const response = await users.signout();
    console.log('signout response', response);
    await removeItem('user');
    setFollowers(null);
    setFollowing(null);
    setFriends(null);
    setRequests(null);
  };

  const handleSwitch = async () => {
    // if (isPrivate) {
    //   setIsPrivate(false);
    //   await updateDoc('users', user.id, {private: false});
    //   const newUser = {...user, private: false};
    //   handleUser(newUser);
    //   storeJson('user', newUser);
    // } else {
    //   setIsPrivate(true);
    //   await updateDoc('users', user.id, {private: true});
    //   const newUser = {...user, private: true};
    //   handleUser(newUser);
    //   storeJson('user', newUser);
    // }
  };

  return (
    <Block paddingVertical={sizes.padding}>
      <Tile
        onPress={handleSwitch}
        text="Private"
        _switch
        switchActive={isPrivate}
      />
      <Tile onPress={signOut} text="Sign out" danger />
    </Block>
  );
}
