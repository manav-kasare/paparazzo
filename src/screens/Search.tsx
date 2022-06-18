import React, {useState} from 'react';
import {FlatList} from 'react-native';
import {Block, Input, UserTile} from '../components';
import {username} from '../constants/regex';
import {IUser} from '../constants/types';
import {useData, useTheme} from '../hooks';
import {searchUsers} from '../services/api';
import {showToast} from '../services/toast';

const renderItem = ({item}: {item: IUser}) => <UserTile {...item} />;

export default function Search() {
  const {user} = useData();
  const {colors, sizes} = useTheme();
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState<Array<any>>([
    {
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/paparazzo-8992f.appspot.com/o/avatars%2FhOv93IHaLZUJyXTA0r91QSjqkd12.jpg?alt=media&token=49dfb503-1138-49f3-8f44-3e2377b7deed',
      email: 'test1@test.com',
      fcm: [],
      followers: 0,
      following: 0,
      friends: 0,
      id: 'hOv93IHaLZUJyXTA0r91QSjqkd12',
      username: 'test1',
    },
  ]);

  const handleSearch = async () => {
    const isValid = username.test(query);
    if (!isValid) return showToast('error', 'Please enter a valid username.');
    const response = await searchUsers(user.id, query);
    console.log('response', response);
    if (response.error)
      return showToast('error', 'Could not search for users!');
    setUsers(response.data ? response.data : []);
  };

  return (
    <Block keyboard>
      <Block
        flex={0}
        style={{
          borderBottomLeftRadius: sizes.cardRadius,
          borderBottomRightRadius: sizes.cardRadius,
        }}
        padding={sizes.padding}
        color={colors.card}>
        <Input
          value={query}
          onChangeText={setQuery}
          search
          handleSearch={handleSearch}
          placeholder="Type username here..."
        />
      </Block>

      <Block paddingVertical={sizes.m}>
        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </Block>
    </Block>
  );
}
