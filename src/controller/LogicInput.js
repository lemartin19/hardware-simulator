import "./LogicInput.css";
import { useState, useCallback } from "react";

const useLogicInput = ({ setLogic }) => {
  const [formContent, setFormContent] = useState("");
  const onChange = useCallback(({ target }) => {
    setFormContent(target.value);
  }, []);
  const onSubmit = useCallback(() => {
    setLogic(formContent);
  }, [setLogic, formContent]);
  return { formContent, onChange, onSubmit };
};

const LogicInput = ({ setLogic }) => {
  const { formContent, onChange, onSubmit } = useLogicInput({ setLogic });
  return (
    <div className="LogicInput">
      <input type="text" id="logic" value={formContent} onChange={onChange} />
      <input type="submit" onClick={onSubmit} />
    </div>
  );
};
LogicInput.displayName = "LogicInput";

export default LogicInput;
