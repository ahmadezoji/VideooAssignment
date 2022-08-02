// store.js
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
  userReducer,
});
export const store = createStore(rootReducer, applyMiddleware(thunk));