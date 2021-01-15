import { useMemo } from "react";
import { parse } from "../model/parse";
import { ViewCompiler } from "../model/ViewCompiler";
import { Out } from "./gates/Gates";

const Workspace = ({ logic }) => {
  const parsed = useMemo(() => parse(logic), [logic]);
  return (
    <div className="Workspace">
      <Out val={0}>
        <ViewCompiler logic={parsed} />
      </Out>
    </div>
  );
};

export default Workspace;
