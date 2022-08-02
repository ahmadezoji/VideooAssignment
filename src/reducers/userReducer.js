// placeReducer.js

import { ADD_PLACE, ADD_USER, GET_USER, REMOVE_USER } from '../actions/types';


const initialState = {
  users: [],
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return { ...state, users: action.payload };
    case ADD_USER:
      return { ...state, users: [...state.users, action.payload] };
    case REMOVE_USER:
      return {
        ...state,
        users: state.users.filter(
          user => user.id !== action.payload.id,
        ),
      };
    default:
      return state;
  }
}
export default userReducer;