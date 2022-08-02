import axios from 'axios';
import { ADD_USER, GET_USER, REMOVE_USER } from './types';
const API = 'https://dummyjson.com/users';

export const getUsers = () => {
  try {
    return async dispatch => {
      const res = await axios.get(`${API}`);
      const users = await res.data.users;
      if (users) {
        dispatch({
          type: GET_USER,
          payload: users,
        });
      } else {
        console.log('Unable to fetch');
      }
    };
  } catch (error) {
    // Add custom logic to handle errors
  }
};
export const addUser = user => dispatch => {
  dispatch({
    type: ADD_USER,
    payload: user,
  });
};
export const removeUser = user => dispatch => {
  dispatch({
    type: REMOVE_USER,
    payload: user,
  });
};