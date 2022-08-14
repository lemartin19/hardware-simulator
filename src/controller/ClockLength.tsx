import { useCallback } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getClockLength, setClockLength } from '../store/clock';

const useClockLength = () => {
  const dispatch = useDispatch();
  const clockLength = useSelector(getClockLength);
  const onChange = useCallback(
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
    <Form>
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

export default ClockLength;
