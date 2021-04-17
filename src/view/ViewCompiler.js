import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import * as ValueTypes from '../model/ValueTypes';
import { getClockValue } from '../store/clock';
import { Gate, Source, Clock } from './gates/Gates';
import { calcMargins } from './utils/calcMargins';

const SourceCompiler = ({ values }) => {
  const vals = values.join('');
  return <Source val={vals} />;
};
SourceCompiler.displayName = 'SourceCompiler';
SourceCompiler.propTypes = {
  values: PropTypes.array.isRequired,
};

const GateCompiler = ({ type, values }) => {
  const { marginTop, marginBottom } = calcMargins({ type, values });
  return (
    <Gate type={type} marginTop={marginTop} marginBottom={marginBottom}>
      {values.map((val, idx) => (
        <ViewCompiler parsed={val} key={idx} />
      ))}
    </Gate>
  );
};
GateCompiler.displayName = 'GateCompiler';
GateCompiler.propTypes = {
  type: PropTypes.string.isRequired,
};

const ClockCompiler = () => {
  const clk = useSelector(getClockValue);
  return <Clock val={clk} />;
};
ClockCompiler.displayName = 'ClockCompiler';

export const ViewCompiler = ({ parsed }) => {
  const { type, values } = parsed;
  switch (type) {
    case ValueTypes.SOURCE:
      return <SourceCompiler values={values} />;
    case ValueTypes.NOT:
    case ValueTypes.AND:
    case ValueTypes.OR:
    case ValueTypes.XOR:
      return <GateCompiler type={type} values={values} />;
    case ValueTypes.CLOCK:
      return <ClockCompiler />;
    default:
      throw new Error('unexpected logical command');
  }
};
ViewCompiler.displayName = 'ViewCompiler';
ViewCompiler.propTypes = {
  parsed: PropTypes.object.isRequired,
};
