import './App.css';
import { useState, useMemo, useEffect } from 'react';
import Workspace from '../view/Workspace';
import LogicInput from '../controller/LogicInput';
import { parse } from '../model/parse';
import { calculate } from '../model/calculator';
import MaybeError from './MaybeError';
import { useDispatch, useSelector } from 'react-redux';
import { getClockLength, getClockValue, tick } from '../store/clock';

const useClock = () => {
  const dispatch = useDispatch();
  const clock = useSelector(getClockValue);
  const clockLength = useSelector(getClockLength);

  useEffect(() => {
    setTimeout(() => dispatch(tick()), clockLength);
  }, [dispatch, clock, clockLength]);

  return { clock };
};

const useApp = () => {
  const [logic, setLogic] = useState('');
  const [error, setError] = useState(null);
  const { clock } = useClock();

  const parsed = useMemo(() => {
    try {
      const parsedLogic = parse(logic);
      setError(null);
      return logic ? parsedLogic : null;
    } catch (error) {
      setError(error.message);
      return null;
    }
  }, [logic]);

  const result = useMemo(() => {
    if (!parsed) return null;
    const calculated = calculate(parsed, clock);
    return calculated.join('');
  }, [parsed, clock]);

  return { parsed, error, result, setLogic };
};

const App = () => {
  const { parsed, error, result, setLogic } = useApp();
  return (
    <div className="App">
      <MaybeError>{error}</MaybeError>
      <Workspace parsed={parsed} result={result} />
      <LogicInput setLogic={setLogic} />
    </div>
  );
};
App.displayName = 'App';

export default App;
