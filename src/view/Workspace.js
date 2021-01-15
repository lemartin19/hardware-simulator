import PropTypes from "prop-types";
import { useMemo } from "react";
import { parse } from "../model/parse";
import { ViewCompiler } from "./ViewCompiler";
import { Out } from "./gates/Gates";

const Workspace = ({ logic }) => {
  const parsed = useMemo(() => parse(logic), [logic]);
  return (
    <div className="Workspace">
      <Out val={0}>
        <ViewCompiler parsed={parsed} />
      </Out>
    </div>
  );
};
Workspace.displayName = "Workspace";
Workspace.propTypes = { logic: PropTypes.string.isRequired };

export default Workspace;
