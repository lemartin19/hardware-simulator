import './LogicInput.css';

import {
  useState,
  useCallback,
  ChangeEventHandler,
  FormEventHandler,
} from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setLogic } from '../store/parsed';

const useLogicInput = () => {
  const dispatch = useDispatch();
  const [formContent, setFormContent] = useState('');

  const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setFormContent(event.target.value);
    },
    []
  );

  const onSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    (event) => {
      event.preventDefault();
      dispatch(setLogic(formContent));
    },
    [dispatch, formContent]
  );

  return { formContent, onChange, onSubmit };
};

const LogicInput = () => {
  const { formContent, onChange, onSubmit } = useLogicInput();
  return (
    <Form className="LogicInput" onSubmit={onSubmit}>
      <Form.Control
        type="text"
        id="logic"
        value={formContent}
        onChange={onChange}
        className="mr-2"
      />
      <Button variant="light" type="submit">
        View
      </Button>
    </Form>
  );
};
LogicInput.displayName = 'LogicInput';
LogicInput.useComponent = useLogicInput;

export default LogicInput;
