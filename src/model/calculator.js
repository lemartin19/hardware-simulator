import * as ValueTypes from './ValueTypes';

const checkBitLengths = (values) => {
  const bitLengths = values.map((input) => input.length);
  for (let idx = 0; idx < bitLengths.length; idx++) {
    if (bitLengths[idx] !== bitLengths[0]) {
      throw new Error(
        `cannot compare inputs with different bit lengths. expected ${
          bitLengths[0]
        } bits, but input ${idx + 1} is ${bitLengths[idx]} bits`
      );
    }
  }
};

const combineValues = (combiner) => (values) => {
  checkBitLengths(values);

  return values.reduce((inputsCombinedSoFar, inputsToCombine) =>
    inputsCombinedSoFar.map((currVal, idx) =>
      combiner(currVal, inputsToCombine[idx])
    )
  );
};
const GATE_FUNCTION = {
  [ValueTypes.NOT]: (values) => values[0].map((val) => (val ? 0 : 1)),
  [ValueTypes.AND]: combineValues((a, b) => a && b),
  [ValueTypes.OR]: combineValues((a, b) => a || b),
};

export const calculate = (parsed, clockValue) => {
  const { type, values } = parsed;
  switch (type) {
    case ValueTypes.SOURCE:
      return values;
    case ValueTypes.NOT:
    case ValueTypes.AND:
    case ValueTypes.OR:
      const calculatedInputs = values.map((input) =>
        calculate(input, clockValue)
      );
      return GATE_FUNCTION[type](calculatedInputs);
    case ValueTypes.CLOCK:
      return [clockValue];
    default:
      throw new Error('unexpected logical command');
  }
};
