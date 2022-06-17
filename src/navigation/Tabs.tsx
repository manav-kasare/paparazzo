import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import {useTheme} from '../hooks';
import {Feed, Profile, Search} from '../screens';
import {Block, Button} from '../components';
import {NavigationProp} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function Tabs({navigation}: {navigation: any}) {
  const {sizes, colors} = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          borderRadius: sizes.avatarRadius,
          backgroundColor: colors.card,
          margin: sizes.md,
          position: 'absolute',
          height: sizes.height * 0.075,
          borderTopColor: 'transparent',
        },
        tabBarShowLabel: false,
        headerStyle: {
          backgroundColor: colors.card,
        },
      }}>
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarIcon: ({focused}) => (
            <SimpleLineIcons
              name="home"
              color={focused ? colors.primary : 'white'}
              size={sizes.m}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({focused}) => (
            <Feather
              name="search"
              color={focused ? colors.primary : 'white'}
              size={sizes.m}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerRight: () => (
            <Button onPress={() => navigation.navigate('Settings')}>
              <Feather name="settings" size={sizes.m} color={colors.text} />
            </Button>
          ),
          tabBarIcon: ({focused}) => (
            <SimpleLineIcons
              name="user"
              color={focused ? colors.primary : 'white'}
              size={sizes.m}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
