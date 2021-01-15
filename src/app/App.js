import "./App.css";
import Workspace from "../view/Workspace";

const App = () => (
  <div className="App">
    <Workspace logic={"(and 0 1)"} />
  </div>
);
App.displayName = "App";

export default App;
