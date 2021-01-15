import "./App.css";
import Workspace from "../view/Workspace";

const App = () => (
  <div className="App">
    <Workspace logic={"(and (or 1 1) (or 1 1))"} />
  </div>
);
App.displayName = "App";

export default App;
