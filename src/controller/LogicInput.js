import './LogicInput.css';

import { useState, useCallback } from 'react';
import { Button, Form } from 'react-bootstrap';

const useLogicInput = ({ setLogic }) => {
  const [formContent, setFormContent] = useState('');
  const onChange = useCallback(({ target }) => {
    setFormContent(target.value);
  }, []);
  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      setLogic(formContent);
    },
    [setLogic, formContent]
  );
  return { formContent, onChange, onSubmit };
};

const LogicInput = ({ setLogic }) => {
  const { formContent, onChange, onSubmit } = useLogicInput({ setLogic });
  return (
    <Form className="LogicInput p-2" onSubmit={onSubmit}>
      <Form.Control
        type="text"
        id="logic"
        value={formContent}
        onChange={onChange}
        className="mr-2"
      />
      <Button variant="light" type="submit">
        View logic
      </Button>
    </Form>
  );
};
LogicInput.displayName = 'LogicInput';

export default LogicInput;
