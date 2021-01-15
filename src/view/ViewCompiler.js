import PropTypes from "prop-types";
import * as ValueTypes from "../model/ValueTypes";
import { Gate, Source } from "./gates/Gates";

const SourceCompiler = ({ values }) => {
  const vals = values.map(Number);
  return <Source val={vals[0]} />;
};
SourceCompiler.displayName = "SourceCompiler";
SourceCompiler.propTypes = {
  values: PropTypes.array.isRequired,
};

const GateCompiler = ({ name, values }) => (
  <Gate name={name}>
    {values.map((val, idx) => (
      <ViewCompiler parsed={val} key={idx} />
    ))}
  </Gate>
);
GateCompiler.displayName = "GateCompiler";
GateCompiler.propTypes = {
  name: ValueTypes.ValueTypesPropType.isRequired,
  values: PropTypes.array.isRequired,
};

export const ViewCompiler = ({ parsed }) => {
  const { type, values } = parsed;
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
ViewCompiler.displayName = "ViewCompiler";
GateCompiler.propTypes = {
  parsed: PropTypes.object.isRequired,
};
