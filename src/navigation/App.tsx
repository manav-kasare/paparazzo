import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {IUser} from '../constants/types';
import {ThemeProvider, useData} from '../hooks';
import {getDoc} from '../services/api';
import {navigationRef} from '../services/navigation';
import {getJson} from '../services/store';
import Auth from './Auth';
import Screens from './Screens';
import Tabs from './Tabs';

export default function () {
  const {theme, setTheme, user, handleUser} = useData();

  useEffect(() => {
    // Platform.OS === 'android' && StatusBar.setTranslucent(true);
    StatusBar.setBackgroundColor('transparent');
    StatusBar.setTranslucent(true);
    StatusBar.setBarStyle('light-content');
    checkUser();
    return () => {
      StatusBar.setBarStyle('default');
    };
  }, []);

  const checkUser = async () => {
    const _user = await getJson('user');
    if (_user && __DEV__) {
      const fbUser = await getDoc('users', _user.id);
      handleUser(fbUser.data);
    } else {
      handleUser(_user);
    }
  };

  const navigationTheme = {
    ...DefaultTheme,
    dark: true,
    colors: {
      ...DefaultTheme.colors,
      border: 'rgba(0,0,0,0)',
      text: String(theme.colors.text),
      card: String(theme.colors.card),
      primary: String(theme.colors.primary),
      notification: String(theme.colors.primary),
      background: String(theme.colors.background),
    },
  };

  return (
    <ThemeProvider theme={theme} setTheme={setTheme}>
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        {user ? <Screens /> : <Auth />}
      </NavigationContainer>
    </ThemeProvider>
  );
}
