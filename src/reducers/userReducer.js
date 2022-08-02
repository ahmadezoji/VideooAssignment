// placeReducer.js

import { ADD_PLACE, ADD_USER, GET_USER } from '../actions/types';


const initialState = {
  users: [],
};

// const userReducer = (state = initialState, action) => {
//   switch(action.type) {
//     case ADD_USER:
//       return {
//         ...state,
//         places: state.users.concat({
//           key: Math.random(),
//           value: action.payload
//         })
//       };
//     default:
//       return state;
//   }
// }



function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {...state, users: action.payload};
    default:
      return state;
  }
}
export default userReducer;