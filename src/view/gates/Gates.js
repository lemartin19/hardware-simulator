import "./Gates.css";
import { HorizontalWire, VerticalWire } from "../wires/Wires";

export const Source = ({ val }) => (
  <div className="flex-row">
    <div className="SOURCE unit">{val}</div>
    <HorizontalWire />
  </div>
);

const Input = ({ children }) => (
  <>
    <VerticalWire>{children}</VerticalWire>
    <HorizontalWire />
  </>
);

export const Gate = ({ name, children }) => (
  <div className="flex-row">
    <Input>{children}</Input>
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
