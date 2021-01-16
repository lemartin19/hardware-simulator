import * as ValueTypes from "../../model/ValueTypes";
import { calcMargins } from "./calcMargins";

const SOURCE_0 = {
  type: ValueTypes.SOURCE,
  values: [0],
};

describe("/view/utils/calcMargins", () => {
  test("source margins are 0", () => {
    const { marginTop, marginBottom } = calcMargins(SOURCE_0);
    expect(marginTop).toBe(0);
    expect(marginBottom).toBe(0);
  });

  test("one gate adds to margins", () => {
    const AND = {
      type: ValueTypes.AND,
      values: [SOURCE_0, SOURCE_0],
    };
    const { marginTop, marginBottom } = calcMargins(AND);
    expect(marginTop).toBe(4.5);
    expect(marginBottom).toBe(4.5);
  });
});
