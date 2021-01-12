import "./Gates.css";

// in reality these should just be styled components?
const HorizontalWire = () => (
  <div style={{ backgroundColor: "white", height: "0.5vh", width: "8vh" }} />
);
// marginTop and marginBottom won't work for compounded children
// need to calculate based on some kind of height?
const VerticalWire = ({ children }) => (
  <>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-end",
      }}
    >
      {children}
    </div>
    <div
      style={{
        alignSelf: "normal",
        backgroundColor: "white",
        width: "0.5vh",
        marginTop: "4.5vh",
        marginBottom: "4.5vh",
      }}
    />
  </>
);

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
