import { createAction, createReducer } from '@reduxjs/toolkit';
import { parse } from '../model/parse';

const SET_LOGIC = 'SET_LOGIC';

export const setLogic = createAction(SET_LOGIC);

export const parsedReducer = createReducer(
  { value: '', error: null },
  {
    [SET_LOGIC]: (state, { payload }) => {
      try {
        const parsedLogic = parse(payload);
        return { parsed: parsedLogic, error: null };
      } catch (error) {
        return { ...state, error: error.message };
      }
    },
  }
);

export const getParsed = (state) => state.parsed;
