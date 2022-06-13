import React, {useEffect} from 'react';
import {Platform, StatusBar} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {ThemeProvider, useData} from '../hooks';
import Tabs from './Tabs';
import {getJson} from '../services/store';
import Auth from './Auth';

export default function () {
  const {theme, setTheme, user, handleUser} = useData();

  useEffect(() => {
    // Platform.OS === 'android' && StatusBar.setTranslucent(true);
    StatusBar.setBackgroundColor(theme.colors.background);
    StatusBar.setBarStyle('light-content');
    checkUser();
    return () => {
      StatusBar.setBarStyle('default');
    };
  }, []);

  const checkUser = async () => {
    const _user = await getJson('user');
    handleUser(_user);
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
      <NavigationContainer theme={navigationTheme}>
        {user ? <Tabs /> : <Auth />}
      </NavigationContainer>
    </ThemeProvider>
  );
}
