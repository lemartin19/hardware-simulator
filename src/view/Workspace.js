import { ViewCompiler } from "../model/ViewCompiler";
import { Out } from "./gates/Gates";

const Workspace = () => (
  <div className="Workspace">
    <Out val={0}>
      <ViewCompiler logic="(and 0 1)" />
    </Out>
  </div>
);

export default Workspace;
