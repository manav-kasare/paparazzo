import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {Block, Input, UserTile} from '../components';
import EmptyList from '../components/EmptyList';
import {username} from '../constants/regex';
import {IUser} from '../constants/types';
import {useData, useTheme} from '../hooks';
import {api} from '../services/api';
import {showToast} from '../services/toast';

export default function Search() {
  const {user} = useData();
  const {colors, sizes} = useTheme();
  const [query, setQuery] = useState('');
  const [data, setData] = useState<Array<any>>([]);
  const [_following, _setFollowing] = useState<any | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    const isValid = username.test(query);
    if (!isValid) return showToast('error', 'Please enter a valid username.');
    const response = await api.users.search(query);
    if (!searched) setSearched(true);
    if (response.error) return showToast('error', 'Could not search for data!');
    setData(response.data ? response.data : []);
  };

  const renderItem = ({item}: {item: IUser}) =>
    item.username === user.username ? <></> : <UserTile {...item} />;

  return (
    <Block>
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
          style={{flex: 1}}
          contentContainerStyle={{flex: 1}}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => (
            <EmptyList
              sad={searched}
              type="search"
              text={
                searched
                  ? 'No results found for this username'
                  : 'To find people you can search above'
              }
            />
          )}
        />
      </Block>
    </Block>
  );
}
