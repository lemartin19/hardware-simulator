import './App.css';
import { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Controller from '../controller/Controller';
import { calculate } from '../model/calculator';
import { getClockLength, getClockValue, tick } from '../store/clock';
import { Workspace } from '../view/Workspace';
import { getParsed } from '../store/parsed';
import { GitHubLink } from './GitHubLink';
import { MaybeError } from './MaybeError';

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
  const { parsed, error: parsedError } = useSelector(getParsed);

  const { result, error: calculatedError } = useMemo(() => {
    if (!parsed) return {};
    try {
      const calculated = calculate(parsed, clock);
      return { result: calculated.join('') };
    } catch (error) {
      return { error: (error as Error).message };
    }
  }, [parsed, clock]);

  return { parsed, error: parsedError || calculatedError, result };
};

export const App = () => {
  const { parsed, error, result } = useApp();
  return (
    <div className="App">
      <MaybeError>{error}</MaybeError>
      <GitHubLink />
      <Workspace parsed={parsed} result={result} />
      <Controller />
    </div>
  );
};
App.displayName = 'App';
App.useComponent = useApp;
