import "./App.css";
import { useState } from "react";
import Workspace from "../view/Workspace";
import LogicInput from "../controller/LogicInput";

const useApp = () => {
  const [logic, setLogic] = useState("");
  return { logic, setLogic };
};

const App = () => {
  const { logic, setLogic } = useApp();
  return (
    <div className="App">
      <Workspace logic={logic} />
      <LogicInput setLogic={setLogic} />
    </div>
  );
};
App.displayName = "App";

export default App;
