import axios from 'axios';
import { ADD_USER, GET_USER } from './types';
const API = 'https://dummyjson.com/users';
export const addUser = firstName => {
  return {
    type: ADD_USER,
    payload: firstName
  }
}
export const getUsers = () => {
  try {
    return async dispatch => {
      const res = await axios.get(`${API}`);
      if (res.data) {
        dispatch({
          type: GET_USER,
          payload: res.data,
        });
      } else {
        console.log('Unable to fetch');
      }
    };
  } catch (error) {
    // Add custom logic to handle errors
  }
};