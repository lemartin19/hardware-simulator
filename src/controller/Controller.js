import React from 'react';
import ClockLength from './ClockLength';
import LogicInput from './LogicInput';

const Controller = () => (
  <div className="d-flex align-items-center justify-content-center">
    <LogicInput />
    <ClockLength />
  </div>
);
Controller.displayName = 'Controller';

export default Controller;
