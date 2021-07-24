import './Workspace.css';

import React from 'react';
import PropTypes from 'prop-types';
import { ViewCompiler } from './ViewCompiler';
import { Out } from './gates/Gates';

const View = ({ parsed, result }) => (
  <Out val={result}>
    <ViewCompiler parsed={parsed} />
  </Out>
);
View.displayName = 'View';
View.propTypes = {
  parsed: PropTypes.object.isRequired,
  result: PropTypes.string.isRequired,
};

const Workspace = ({ parsed, result }) => (
  <div className="Workspace">
    {parsed ? <View parsed={parsed} result={result} /> : null}
  </div>
);
Workspace.displayName = 'Workspace';
Workspace.propTypes = {
  parsed: PropTypes.object,
  result: PropTypes.string,
};

export default Workspace;
