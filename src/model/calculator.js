import * as ValueTypes from "./ValueTypes";

export const calculate = (parsed) => {
  const { type, values } = parsed;
  switch (type) {
    case ValueTypes.SOURCE:
      return values[0];
    case ValueTypes.NOT:
      const not = calculate(values[0]);
      return not ? 0 : 1;
    case ValueTypes.AND:
      const and = values.map(calculate).every(Boolean);
      return and ? 1 : 0;
    case ValueTypes.OR:
      const or = values.map(calculate).some(Boolean);
      return or ? 1 : 0;
    default:
      throw new Error("unexpected logical command");
  }
};
