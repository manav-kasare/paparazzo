import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {Button} from '../components';
import {useTheme} from '../hooks';
import {Feed, Profile, Search} from '../screens';

const Tab = createBottomTabNavigator();

export default function Tabs({navigation}: {navigation: any}) {
  const {sizes, colors} = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          // borderTopRightRadius: sizes.cardRadius,
          // borderTopLeftRadius: sizes.cardRadius,
          backgroundColor: colors.card,
          height: sizes.height * 0.08,
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
