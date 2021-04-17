import './Gates.css';

import PropTypes from 'prop-types';
import { HorizontalWire, VerticalWire } from '../wires/Wires';

export const Source = ({ val }) => (
  <div className="flex-row">
    <div className="SOURCE unit">{val}</div>
    <HorizontalWire />
  </div>
);
Source.displayName = 'Source';
Source.propTypes = { val: PropTypes.oneOf(['0', '1']).isRequired };

const Input = ({ marginTop, marginBottom, children }) => {
  return children.length <= 1 ? (
    children
  ) : (
    <>
      <VerticalWire marginTop={marginTop} marginBottom={marginBottom}>
        {children}
      </VerticalWire>
      <HorizontalWire />
    </>
  );
};
Input.displayName = 'Input';
Input.propTypes = {
  children: PropTypes.node.isRequired,
  marginBottom: PropTypes.number.isRequired,
  marginTop: PropTypes.number.isRequired,
};

export const Gate = ({ type, marginTop, marginBottom, children }) => (
  <div className="flex-row">
    <Input marginTop={marginTop} marginBottom={marginBottom}>
      {children}
    </Input>
    <div className={`${type} unit`}>{type}</div>
    <HorizontalWire />
  </div>
);
Gate.displayName = 'Gate';
Gate.propTypes = {
  children: PropTypes.node.isRequired,
  marginBottom: PropTypes.number.isRequired,
  marginTop: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export const Clock = ({ val }) => (
  <div className="flex-row">
    <div className="CLOCK unit">{val}</div>
    <HorizontalWire />
  </div>
);
Clock.displayName = 'Clock';
Clock.propTypes = { val: PropTypes.oneOf([0, 1]).isRequired };

export const Out = ({ val, children }) => (
  <div className="flex-row">
    <div>{children}</div>
    <div className="OUT unit">{val}</div>
  </div>
);
Out.displayName = 'Out';
Out.propTypes = {
  children: PropTypes.node.isRequired,
  val: PropTypes.oneOf(['0', '1']).isRequired,
};
