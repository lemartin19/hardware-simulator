import './App.css';
import { useState, useMemo } from 'react';
import Workspace from '../view/Workspace';
import LogicInput from '../controller/LogicInput';
import { parse } from '../model/parse';
import { calculate } from '../model/calculator';
import MaybeError from './MaybeError';

const useApp = () => {
  const [logic, setLogic] = useState('');
  const [error, setError] = useState(null);

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
    const calculated = calculate(parsed);
    return calculated.join('');
  }, [parsed]);

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
