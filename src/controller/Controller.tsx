import ClockLength from './ClockLength';
import LogicInput from './LogicInput';

const Controller = () => (
  <div className="d-flex align-items-center justify-content-center mb-4">
    <div className="mr-4">
      <LogicInput />
    </div>
    <ClockLength />
  </div>
);
Controller.displayName = 'Controller';

export default Controller;
