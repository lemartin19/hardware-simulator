import { render, screen } from "@testing-library/react";
import * as ValueTypes from "../model/ValueTypes";
import { ViewCompiler } from "./ViewCompiler";

const SOURCE0 = {
  type: ValueTypes.SOURCE,
  values: [0],
};

describe("/view/ViewCompiler", () => {
  describe("source", () => {
    test("is added to the document", () => {
      render(<ViewCompiler parsed={SOURCE0} />);
      const sourceText = screen.getByText(/0/);
      expect(sourceText).toBeInTheDocument();
    });
  });

  describe("gate", () => {
    test("is added to the document", () => {
      const and = {
        type: ValueTypes.AND,
        values: [SOURCE0, SOURCE0],
      };
      render(<ViewCompiler parsed={and} />);
      const sourcesText = screen.getAllByText(/0/);
      expect(sourcesText.length).toBe(2);
    });
  });
});
