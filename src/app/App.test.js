import { render, screen } from "@testing-library/react";
import App from ".";

test("renders Workspace", () => {
  render(<App />);
  // const workspace = screen.getByText(/learn react/i);
  // expect(workspace).toBeInTheDocument();
});
