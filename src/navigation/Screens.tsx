import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Settings} from '../screens';
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
    </Stack.Navigator>
  );
}
