import React, {useState} from 'react';
import {Block, Tile} from '../components';
import {useData, useTheme} from '../hooks';
import {api} from '../services/api';
import {removeItem} from '../services/store';

export default function Settings() {
  const {
    handleUser,
    user,
    setFollowers,
    setFollowing,
    setFriends,
    setFriendRequests,
    setFollowRequests,
    setToken,
  } = useData();
  const {sizes} = useTheme();
  const [isPrivate, setIsPrivate] = useState(user.isPrivate);

  const signOut = async () => {
    await removeItem('user');
    await removeItem('token');
    await api.users.signout();
    handleUser(undefined);
    setToken(undefined);
    setFollowers(null);
    setFollowing(null);
    setFriends(null);
    setFollowRequests(null);
    setFriendRequests(null);
  };

  const handleSwitch = async () => {
    if (isPrivate) {
      setIsPrivate(false);
      await api.users.update({isPrivate: false});
      const newUser = {...user, isPrivate: false};
      handleUser(newUser);
    } else {
      setIsPrivate(true);
      await api.users.update({isPrivate: true});
      const newUser = {...user, isPrivate: true};
      handleUser(newUser);
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
