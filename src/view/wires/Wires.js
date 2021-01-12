export const HorizontalWire = () => (
  <div style={{ backgroundColor: "white", height: "0.5vh", width: "8vh" }} />
);

export const VerticalWire = ({ children }) => (
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
        marginTop: `4.5vh`,
        marginBottom: `4.5vh`,
      }}
    />
  </>
);
