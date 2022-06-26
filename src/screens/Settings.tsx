import React, {useState} from 'react';
import {Block, Tile} from '../components';
import {useData, useTheme} from '../hooks';
import {users} from '../services/api';
import {removeItem, storeJson} from '../services/store';

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
  const [isPrivate, setIsPrivate] = useState(user.isPrivate);

  const signOut = async () => {
    await removeItem('user');
    await removeItem('token');
    await users.signout();
    handleUser(undefined);
    setToken(undefined);
    setFollowers(null);
    setFollowing(null);
    setFriends(null);
    setRequests(null);
  };

  const handleSwitch = async () => {
    if (isPrivate) {
      setIsPrivate(false);
      await users.update({isPrivate: false});
      const newUser = {...user, isPrivate: false};
      handleUser(newUser);
      storeJson('user', newUser);
    } else {
      setIsPrivate(true);
      await users.update({isPrivate: true});
      const newUser = {...user, isPrivate: true};
      handleUser(newUser);
      storeJson('user', newUser);
    }
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
