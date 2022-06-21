import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  CreatePost,
  Followers,
  Following,
  Friends,
  Requests,
  Settings,
  User,
} from '../screens';
import Tabs from './Tabs';

const Stack = createNativeStackNavigator();

export default function Screens() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
      }}>
      <Stack.Screen
        name="Home"
        component={Tabs}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Followers" component={Followers} />
      <Stack.Screen name="Following" component={Following} />
      <Stack.Screen name="Friends" component={Friends} />
      <Stack.Screen name="Requests" component={Requests} />
      <Stack.Screen name="User" component={User} options={{headerTitle: ''}} />
      <Stack.Screen
        name="CreatePost"
        component={CreatePost}
        options={{
          animation: 'fade_from_bottom',
          headerTitle: '',
        }}
      />
    </Stack.Navigator>
  );
}
