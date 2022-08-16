import { ChangeEventHandler, useCallback } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getClockLength, setClockLength } from '../store/clock';

const useClockLength = () => {
  const dispatch = useDispatch();
  const clockLength = useSelector(getClockLength);
  const onChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    (event) => {
      event.preventDefault();
      const clockLength = Number(event.target.value);
      dispatch(setClockLength(clockLength));
    },
    [dispatch]
  );
  return { clockLength, onChange };
};

const ClockLength = () => {
  const { clockLength, onChange } = useClockLength();
  return (
    <Form className="d-flex flex-row">
      <Form.Label className="pr-2 mb-0 text-nowrap">
        Clock Length (seconds):
      </Form.Label>
      <Form.Control as="select" onChange={onChange} value={clockLength} custom>
        <option>0.1</option>
        <option>0.25</option>
        <option>0.5</option>
        <option>1</option>
        <option>2</option>
        <option>4</option>
      </Form.Control>
    </Form>
  );
};
ClockLength.displayName = 'ClockLength';
ClockLength.useComponent = ClockLength;

export default ClockLength;
