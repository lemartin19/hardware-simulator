import { combineReducers, createStore } from 'redux';
import { clockReducer } from './clock';

const store = combineReducers({ clock: clockReducer });

export default createStore(store);
