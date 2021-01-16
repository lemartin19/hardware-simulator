import "./Workspace.css";
import PropTypes from "prop-types";
import { ViewCompiler } from "./ViewCompiler";
import { Out } from "./gates/Gates";

const View = ({ parsed, result }) => (
  <Out val={result}>
    <ViewCompiler parsed={parsed} />
  </Out>
);
View.displayName = "View";
View.propTypes = {
  logic: PropTypes.object.isRequired,
  result: PropTypes.number.isRequired,
};

const Workspace = ({ parsed, result }) => (
  <div className="Workspace">
    {parsed ? <View parsed={parsed} result={result} /> : null}
  </div>
);
Workspace.displayName = "Workspace";
Workspace.propTypes = {
  logic: PropTypes.object.isRequired,
  result: PropTypes.number.isRequired,
};

export default Workspace;
