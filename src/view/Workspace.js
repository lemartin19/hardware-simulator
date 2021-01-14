import { Gate, Out, Source } from "./gates/Gates";

const Workspace = () => (
  <div className="Workspace">
    <Out val={0}>
      <Gate name="AND" marginTop={4.5} marginBottom={4.5}>
        <Source val={0} />
        <Source val={1} />
      </Gate>
    </Out>
  </div>
);

export default Workspace;
