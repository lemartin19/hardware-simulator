import "./Gates.css";

export const Source = ({ val }) => (
  <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
    <div className="Source unit">{val}</div>
    <HorizontalWire />
  </div>
);

// in reality these should just be styled components?
const HorizontalWire = () => (
  <div style={{ backgroundColor: "white", height: "0.5vh", width: "8vh" }} />
);
// marginTop and marginBottom won't work for compounded children
// need to calculate based on some kind of height?
const VerticalWire = () => (
  <div
    style={{
      alignSelf: "normal",
      backgroundColor: "white",
      width: "0.5vh",
      marginTop: "4.5vh",
      marginBottom: "4.5vh",
    }}
  />
);

const Input = ({ children }) => (
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
    <VerticalWire />
    <HorizontalWire />
  </>
);

export const Gate = ({ name, children }) => (
  <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
    <Input>{children}</Input>
    <div className={`${name} unit`}>{name}</div>
    <HorizontalWire />
  </div>
);

export const Out = ({ val, children }) => (
  <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
    <div>{children}</div>
    <div className="Out unit">{val}</div>
  </div>
);
