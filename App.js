/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {useEffect} from 'react';

import RNBootSplash from 'react-native-bootsplash';
import Navigation from './src/navigation';
import {Provider} from 'react-redux';
import {Store, Persistor} from './src/store/Store';
import {PersistGate} from 'redux-persist/integration/react';
import {LogBox, StatusBar} from 'react-native';
import Colors from 'config/Colors';

LogBox.ignoreAllLogs();
const App = () => {
  useEffect(() => {
    RNBootSplash.hide({fade: true}); // fade
  }, []);

  return (
    <Provider store={Store}>
      <PersistGate persistor={Persistor}>
        <StatusBar
          backgroundColor="transparent"
          translucent={true}
          barStyle={'dark-content'}
        />
        <Navigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
