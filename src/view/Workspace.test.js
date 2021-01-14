import { render, screen } from "@testing-library/react";
import Workspace from ".";

test("renders learn react link", () => {
  render(<Workspace />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
