import { render, screen } from "@testing-library/react";
import * as parse from "../model/parse";
import * as ValueTypes from "../model/ValueTypes";
import { ViewCompiler } from "./ViewCompiler";

describe("/view/ViewCompiler", () => {
  describe("source", () => {
    test("is added to the document", () => {
      const parseSpy = jest.spyOn(parse, "parse").mockReturnValue({
        type: ValueTypes.SOURCE,
        values: [0],
      });
      render(<ViewCompiler logic="0" />);
      const sourceText = screen.getByText(/0/);

      expect(parseSpy).toHaveBeenCalledWith("0");
      expect(sourceText).toBeInTheDocument();
    });
  });

  describe("gate", () => {
    test("is added to the document", () => {
      const source0 = {
        type: ValueTypes.SOURCE,
        values: [0],
      };
      const parseSpy = jest.spyOn(parse, "parse").mockReturnValue({
        type: ValueTypes.AND,
        values: [source0, source0],
      });
      render(<ViewCompiler logic="(and 0 0)" />);
      const sourceText = screen.getByText(/0/);

      expect(parseSpy).toHaveBeenCalledWith("0");
      expect(sourceText).toBeInTheDocument();
    });
  });
});
