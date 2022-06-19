import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Followers, Following, Friends, Settings} from '../screens';
import Tabs from './Tabs';

const Stack = createNativeStackNavigator();

export default function Screens() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Tabs} />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Followers"
        component={Followers}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Following"
        component={Following}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Friends"
        component={Friends}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
}
