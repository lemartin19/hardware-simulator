import { Gate, Out, Source } from "./Gates";

const Workspace = () => (
  <div className="Workspace">
    <Out val={0}>
      <Gate name="And">
        <Source val={0} />
        <Source val={1} />
      </Gate>
    </Out>
  </div>
);

export default Workspace;
