import { combineReducers, createStore } from 'redux';
import { clockReducer } from './clock';
import { parsedReducer } from './parsed';

const store = combineReducers({ clock: clockReducer, parsed: parsedReducer });

export default createStore(store);
