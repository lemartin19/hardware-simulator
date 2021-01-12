import { Gate, Out, Source } from "./gates/Gates";

const Workspace = () => (
  <div className="Workspace">
    <Out val={0}>
      <Gate name="AND">
        <Source val={0} />
        <Source val={1} />
      </Gate>
    </Out>
  </div>
);

export default Workspace;
