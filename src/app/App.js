import "./App.css";
import { useState, useMemo } from "react";
import Workspace from "../view/Workspace";
import LogicInput from "../controller/LogicInput";
import { parse } from "../model/parse";
import { calculate } from "../model/calculator";

const useApp = () => {
  const [logic, setLogic] = useState("");
  const parsed = useMemo(() => (logic ? parse(logic) : null), [logic]);
  const result = useMemo(() => (parsed ? calculate(parsed) : null), [parsed]);
  return { parsed, result, setLogic };
};

const App = () => {
  const { parsed, result, setLogic } = useApp();
  return (
    <div className="App">
      <Workspace logic={parsed} result={result} />
      <LogicInput setLogic={setLogic} />
    </div>
  );
};
App.displayName = "App";

export default App;
