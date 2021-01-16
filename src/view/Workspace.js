import PropTypes from "prop-types";
import { useMemo } from "react";
import { parse } from "../model/parse";
import { ViewCompiler } from "./ViewCompiler";
import { Out } from "./gates/Gates";

const View = ({ logic }) => {
  const parsed = useMemo(() => parse(logic), [logic]);
  return (
    <Out val={0}>
      <ViewCompiler parsed={parsed} />
    </Out>
  );
};

const Workspace = ({ logic }) => {
  return (
    <div className="Workspace">{logic ? <View logic={logic} /> : null}</div>
  );
};
Workspace.displayName = "Workspace";
Workspace.propTypes = { logic: PropTypes.string.isRequired };

export default Workspace;
