import React from 'react';
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
