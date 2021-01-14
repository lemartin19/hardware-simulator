import "./Gates.css";
import { HorizontalWire, VerticalWire } from "../wires/Wires";

export const Source = ({ val }) => (
  <div className="flex-row">
    <div className="SOURCE unit">{val}</div>
    <HorizontalWire />
  </div>
);

const Input = ({ marginTop, marginBottom, children }) => (
  <>
    <VerticalWire marginTop={marginTop} marginBottom={marginBottom}>
      {children}
    </VerticalWire>
    <HorizontalWire />
  </>
);

export const Gate = ({ name, marginTop, marginBottom, children }) => (
  <div className="flex-row">
    <Input marginTop={marginTop} marginBottom={marginBottom}>
      {children}
    </Input>
    <div className={`${name} unit`}>{name}</div>
    <HorizontalWire />
  </div>
);

export const Out = ({ val, children }) => (
  <div className="flex-row">
    <div>{children}</div>
    <div className="OUT unit">{val}</div>
  </div>
);
