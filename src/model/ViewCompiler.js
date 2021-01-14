import { parse } from "./parse";
import * as ValueTypes from "./ValueTypes";
import { Gate, Source } from "../view/gates/Gates";

const SourceCompiler = ({ values }) => {
  const vals = values.map(Number);
  return <Source val={vals[0]} />;
};
SourceCompiler.displayName = "SourceCompiler";

const GateCompiler = ({ name, values }) => {
  return (
    <Gate name={name}>
      {values.map((val) => (
        <ViewCompiler logic={val} />
      ))}
    </Gate>
  );
};
GateCompiler.displayName = "GateCompiler";

export const ViewCompiler = ({ logic }) => {
  const { type, values } = parse(logic);
  switch (type) {
    case ValueTypes.SOURCE:
      return <SourceCompiler values={values} />;
    case ValueTypes.NOT:
    case ValueTypes.AND:
    case ValueTypes.OR:
      return <GateCompiler name={type} values={values} />;
    default:
      throw new Error("unexpected logical command");
  }
};
ViewCompiler.displayName = "Parser";
