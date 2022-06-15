import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {AuthStackParamList} from '../constants/types';
import {useTheme} from '../hooks';
import {Onboard, ProfileSetup} from '../screens';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function Auth() {
  const {colors} = useTheme();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Onboard"
        component={Onboard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfileSetup"
        component={ProfileSetup}
        options={{
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerShadowVisible: false,
          headerTitle: '',
        }}
      />
    </Stack.Navigator>
  );
}
