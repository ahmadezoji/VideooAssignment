import { ADD_USER } from './types';

export const addUser = firstName => {
  return {
    type: ADD_USER,
    payload: firstName
  }
}