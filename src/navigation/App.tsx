import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {ThemeProvider, useData} from '../hooks';
import {getJson} from '../services/store';
import Auth from './Auth';
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
