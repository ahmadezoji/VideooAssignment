import { AppRegistry } from 'react-native';
import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';
import { userDetail, userShow } from './components/user';


const Main = () => (
  <Router>
    <Stack key="root">
      <Scene key="userShow" component={userShow} title="show list" />
      <Scene key="userDetail" component={userDetail} title="user details" />
    </Stack>
  </Router>
);

export {Main};