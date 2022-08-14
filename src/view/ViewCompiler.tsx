import { useSelector } from 'react-redux';
import {
  isParsedClock,
  isParsedGate,
  isParsedSource,
  Parsed,
  ParsedGate,
  ParsedSource,
} from '../model/Parsed';
import { getClockValue } from '../store/clock';
import { Gate, Source, Clock } from './gates/Gates';
import { calcMargins } from './utils/calcMargins';

const SourceCompiler = ({ values }: Pick<ParsedSource, 'values'>) => {
  const vals = values.join('');
  return <Source val={vals} />;
};
SourceCompiler.displayName = 'SourceCompiler';

const GateCompiler = ({ type, values }: ParsedGate) => {
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

const ClockCompiler = () => {
  const clk = useSelector(getClockValue);
  return <Clock val={clk} />;
};
ClockCompiler.displayName = 'ClockCompiler';

export const ViewCompiler = ({ parsed }: { parsed: Parsed }) => {
  if (isParsedSource(parsed)) {
    return <SourceCompiler values={parsed.values} />;
  }

  if (isParsedGate(parsed)) {
    return <GateCompiler type={parsed.type} values={parsed.values} />;
  }

  if (isParsedClock(parsed)) {
    return <ClockCompiler />;
  }

  throw new Error('unexpected logical command');
};
ViewCompiler.displayName = 'ViewCompiler';
