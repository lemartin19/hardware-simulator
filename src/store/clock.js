import { createAction, createReducer } from '@reduxjs/toolkit';

const TICK = 'TICK';

export const tick = createAction(TICK);

export const clockReducer = createReducer(
  { value: 0, length: 1000 },
  { [TICK]: (state) => ({ ...state, value: 1 - state.value }) }
);

export const getClockValue = (state) => state.clock.value;
export const getClockLength = (state) => state.clock.length;
