import { createAction, createReducer } from '@reduxjs/toolkit';

const TICK = 'TICK';
const SET_LENGTH = 'SET_LENGTH';

export const tick = createAction(TICK);
export const setClockLength = createAction(SET_LENGTH);

export const clockReducer = createReducer(
  { value: 0, length: 1000 },
  {
    [TICK]: (state) => ({ ...state, value: 1 - state.value }),
    [SET_LENGTH]: (state, { payload }) => ({ ...state, length: payload }),
  }
);

export const getClockValue = (state) => state.clock.value;
export const getClockLength = (state) => state.clock.length;
