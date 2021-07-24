import './App.css';
import React, { useMemo, useEffect } from 'react';
import Workspace from '../view/Workspace';
import { calculate } from '../model/calculator';
import MaybeError from './MaybeError';
import { useDispatch, useSelector } from 'react-redux';
import { getClockLength, getClockValue, tick } from '../store/clock';
import { getParsed } from '../store/parsed';
import Controller from '../controller/Controller';

const useClock = () => {
  const dispatch = useDispatch();
  const clock = useSelector(getClockValue);
  const clockLength = useSelector(getClockLength);

  useEffect(() => {
    setTimeout(() => dispatch(tick()), clockLength * 1000);
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [dispatch, clock]);

  return { clock };
};

const useApp = () => {
  const { clock } = useClock();
  const { parsed, error } = useSelector(getParsed);

  const result = useMemo(() => {
    if (!parsed) return null;
    const calculated = calculate(parsed, clock);
    return calculated.join('');
  }, [parsed, clock]);

  return { parsed, error, result };
};

const App = () => {
  const { parsed, error, result } = useApp();
  return (
    <div className="App">
      <MaybeError>{error}</MaybeError>
      <Workspace parsed={parsed} result={result} />
      <Controller />
    </div>
  );
};
App.displayName = 'App';

export default App;
