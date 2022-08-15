import { createAction, createReducer } from '@reduxjs/toolkit';
import { Binary } from '../model/Parsed';

const TICK = 'TICK';
const SET_LENGTH = 'SET_LENGTH';

export const tick = createAction(TICK);

export const setClockLength = createAction<number, typeof SET_LENGTH>(
  SET_LENGTH
);

interface State {
  value: Binary;
  length: number;
}

export const clockReducer = createReducer<State>(
  { value: 0, length: 1 },
  {
    [TICK]: (state: State) => ({
      ...state,
      value: (1 - state.value) as Binary,
    }),
    [SET_LENGTH]: (state: State, { payload }: { payload: number }) => ({
      ...state,
      length: payload,
    }),
  }
);

export const getClockValue = (state: { clock: State }) => state.clock.value;
export const getClockLength = (state: { clock: State }) => state.clock.length;
