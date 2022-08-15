import { Command } from './Command';
import {
  Binary,
  isParsedClock,
  isParsedGate,
  isParsedSource,
  Parsed,
} from './Parsed';

type Input = Binary[];

const checkBitLengths = (values: Input[]) => {
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

type Combiner = (a: Binary, b: Binary) => Binary;

const combineValues = (combiner: Combiner) => (values: Input[]) => {
  checkBitLengths(values);

  return values.reduce((inputsCombinedSoFar, inputsToCombine) =>
    inputsCombinedSoFar.map((currVal, idx) =>
      combiner(currVal, inputsToCombine[idx])
    )
  );
};

const GATE_FUNCTION = {
  [Command.NOT]: (values: Input[]) => values[0].map((val) => (val ? 0 : 1)),
  [Command.AND]: combineValues((a, b) => a && b),
  [Command.OR]: combineValues((a, b) => a || b),
  [Command.XOR]: combineValues((a, b) => (a ? (b ? 0 : 1) : b)),
};

export const calculate = (parsed: Parsed, clockValue: Binary): Input => {
  if (isParsedSource(parsed)) {
    return parsed.values;
  }

  if (isParsedGate(parsed)) {
    const calculatedInputs = parsed.values.map((input) =>
      calculate(input, clockValue)
    );
    return GATE_FUNCTION[parsed.type](calculatedInputs);
  }

  if (isParsedClock(parsed)) {
    return [clockValue];
  }

  throw new Error('unexpected logical command');
};
