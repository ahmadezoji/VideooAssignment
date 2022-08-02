import { AppRegistry } from 'react-native';
import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';
import { connect } from 'react-redux';
import UserClass, { userAdd, userDetail, UserShow } from './components/User';

const Main = () => (
  <Router>
    <Stack key="root">
      <Scene key="userShow" component={UserShow} title="show list" />
      <Scene key="userDetail" component={userDetail} title="user details" />
      <Scene key="userAdd" component={userAdd} title="user add" />
    </Stack>
  </Router>
);

// const mapStateToProps = state => {
//   return {
//       places: state.places.places
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//       add: (name) => {
//           dispatch(addPlace(name))
//       }
//   }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(Main)

export { Main };