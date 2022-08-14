import { createAction, createReducer } from '@reduxjs/toolkit';
import { parse } from '../model/parse';
import { Parsed } from '../model/Parsed';

const SET_LOGIC = 'SET_LOGIC';

export const setLogic = createAction<string, typeof SET_LOGIC>(SET_LOGIC);

interface State {
  parsed?: Parsed;
  error: string | null;
}

export const parsedReducer = createReducer<State>(
  { error: null },
  {
    [SET_LOGIC]: (state, { payload }: { payload: string }) => {
      try {
        const parsedLogic = parse(payload);
        return { parsed: parsedLogic, error: null };
      } catch (error) {
        return { ...state, error: (error as Error).message };
      }
    },
  }
);

export const getParsed = (state: { parsed: State }) => state.parsed;
