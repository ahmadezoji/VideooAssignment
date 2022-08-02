import { AppRegistry } from 'react-native';
import React from 'react';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { Main } from './src';
import { store } from './src/store';


// const store = configureStore()

const RNRedux = () => (
  <Provider store = { store }>
    <Main />
  </Provider>
)

AppRegistry.registerComponent(appName, () => RNRedux);