import * as ValueTypes from '../../model/ValueTypes';

const calcMargin = (idxFn, { type, values }) => {
  switch (type) {
    case ValueTypes.SOURCE:
    case ValueTypes.CLOCK:
      return 0;
    case ValueTypes.NOT:
    case ValueTypes.AND:
    case ValueTypes.OR:
      const idx = idxFn(values);
      const { marginTop, marginBottom } = calcMargins(values[idx]);
      const addedMargin = type === ValueTypes.NOT ? 0 : 4;
      return addedMargin + Math.max(marginTop, marginBottom);
    default:
      throw new Error(`unexpected type in calcMargin, got: ${type}`);
  }
};

export const calcMargins = ({ type, values }) => ({
  marginTop: calcMargin(() => 0, { type, values }),
  marginBottom: calcMargin((vals) => vals.length - 1, { type, values }),
});
