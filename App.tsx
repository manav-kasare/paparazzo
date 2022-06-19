import React from 'react';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

import {DataProvider} from './src/hooks';
import AppNavigation from './src/navigation/App';

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <DataProvider>
        <AppNavigation />
        <Toast />
      </DataProvider>
    </GestureHandlerRootView>
  );
}
