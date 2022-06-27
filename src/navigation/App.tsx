import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {ThemeProvider, useData} from '../hooks';
import {api, setHeader} from '../services/api';
import {navigationRef} from '../services/navigation';
import {getJson, getString} from '../services/store';
import Auth from './Auth';
import Screens from './Screens';

export default function () {
  const {theme, setTheme, token, setToken, user, handleUser} = useData();

  useEffect(() => {
    StatusBar.setBackgroundColor('transparent');
    StatusBar.setTranslucent(true);
    StatusBar.setBarStyle('light-content');
    checkToken();
    return () => {
      StatusBar.setBarStyle('default');
    };
  }, []);

  const checkToken = async () => {
    const _token = await getString('token');
    if (!_token) return;
    setHeader(_token);
    const storedUser = await getJson('user');
    setToken(_token);
    handleUser(storedUser);
    const response = await api.users.me();
    handleUser(response.data);
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
        {token && user ? <Screens /> : <Auth />}
      </NavigationContainer>
    </ThemeProvider>
  );
}
