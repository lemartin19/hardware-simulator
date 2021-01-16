import * as ValueTypes from "../../model/ValueTypes";

export const calcMargin = (idxFn, { type, values }) => {
  switch (type) {
    case ValueTypes.SOURCE:
      return 0;
    case ValueTypes.NOT:
    case ValueTypes.AND:
    case ValueTypes.OR:
      const idx = idxFn(values);
      return 4.5 + calcMargin(idxFn, values[idx]);
    default:
      throw new Error(`unexpected type in calcBottomMargin, got: ${type}`);
  }
};

export const calcMargins = ({ type, values }) => ({
  marginTop: calcMargin(() => 0, { type, values }),
  marginBottom: calcMargin((vals) => vals.length - 1, { type, values }),
});
