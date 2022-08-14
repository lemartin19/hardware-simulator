import './Workspace.css';

import { ViewCompiler } from './ViewCompiler';
import { Out } from './gates/Gates';
import { Parsed } from '../model/Parsed';

const View = ({ parsed, result }: { parsed: Parsed; result: string }) => (
  <Out val={result}>
    <ViewCompiler parsed={parsed} />
  </Out>
);
View.displayName = 'View';

const Workspace = ({
  parsed,
  result,
}: {
  parsed?: Parsed;
  result?: string;
}) => (
  <div className="Workspace">
    {parsed && result ? <View parsed={parsed} result={result} /> : null}
  </div>
);
Workspace.displayName = 'Workspace';

export default Workspace;
