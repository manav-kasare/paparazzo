import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {Block, SmallUserTile} from '../components';
import {useData, useTheme} from '../hooks';
import {getRequestsWithId} from '../services/api';

export default function Requests() {
  const {sizes} = useTheme();
  const {requests, setRequests, user} = useData();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!requests) {
      setLoading(true);
      handleGetRequests();
    }
  }, []);

  const handleGetRequests = async () => {
    const response = await getRequestsWithId(user.id);
    console.log('resposne', response);
    if (response.error) return;
    setRequests(response.data);
    setLoading(false);
  };

  const handleAccept = () => {};

  const handleReject = () => {};

  const renderItem = ({item}: any) => (
    <SmallUserTile
      {...item.from}
      type="request"
      handleAccept={handleAccept}
      handleReject={handleReject}
    />
  );

  return (
    <Block paddingVertical={sizes.padding}>
      <FlatList
        data={requests}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </Block>
  );
}
