import { Command } from './Command';
import { Binary, isBinaryDigit, Parsed, ParsedClock } from './Parsed';

const sourceParser = (inputs: string): Binary[] => {
  const inputArr = inputs.split('').map(Number);

  if (inputArr.every(isBinaryDigit)) return inputArr;

  throw new Error(
    `expected every source input to be a binary digit (0 or 1), received '${inputs}'`
  );
};

const fixedInputParser = (
  name: Command,
  inputs: string[],
  numInputs: number
): Parsed[] => {
  if (inputs.length !== numInputs) {
    throw new Error(
      `expected ${numInputs} input to ${name}, got: ${inputs.length}`
    );
  }

  return inputs.map(parse);
};

const multiInputGateParser = (
  name: Command,
  inputs: string[],
  minNumInputs: number
): Parsed[] => {
  if (inputs.length < 2) {
    throw new Error(
      `expected at least ${minNumInputs} inputs to '${name}', got: ${inputs.length}`
    );
  }

  return inputs.map(parse);
};

const clkParser = (inputs: string[]): ParsedClock['values'] => {
  if (inputs.length !== 0) {
    throw new Error(`expected 0 inputs to 'clk', got: ${inputs.length}`);
  }

  return [];
};

const findCloseParen = (logic: string): number => {
  let idx = 1;
  let count = 1;
  while (count > 0) {
    if (logic.length <= idx)
      throw new Error('malformed command - no close paren');

    if (logic.charAt(idx) === '(') count += 1;
    if (logic.charAt(idx) === ')') count -= 1;
    idx++;
  }
  return idx;
};

const parseInputs = (logic: string): string[] => {
  if (logic.length === 0) return [];

  const endIdx = logic.startsWith('(')
    ? findCloseParen(logic)
    : logic.indexOf(' ');
  const first = logic.slice(0, endIdx);
  const rest = logic.slice(endIdx + 1);

  return endIdx < 0 ? [logic] : [first, ...parseInputs(rest)];
};

export const parse = (logic: string): Parsed => {
  if (!logic.startsWith('(')) {
    return { type: Command.SOURCE, values: sourceParser(logic) };
  }

  const match = logic.match(/^\((?<cmd>[a-z]+) ?(?<rest>.*)\)$/);

  if (!match) throw new Error(`Failed to parse`);

  const { cmd, rest } = match.groups as { cmd: Command; rest: string };
  const inputs = parseInputs(rest);

  switch (cmd) {
    case Command.NOT:
      return {
        type: Command.NOT,
        values: fixedInputParser(cmd, inputs, 1),
      };
    case Command.AND:
      return {
        type: Command.AND,
        values: multiInputGateParser(cmd, inputs, 2),
      };
    case Command.OR:
      return {
        type: Command.OR,
        values: multiInputGateParser(cmd, inputs, 2),
      };
    case Command.XOR:
      return {
        type: Command.XOR,
        values: multiInputGateParser(cmd, inputs, 2),
      };
    case Command.CLOCK:
      return { type: Command.CLOCK, values: clkParser(inputs) };
    default:
      throw new Error(`unexpected logical command, got: ${cmd}`);
  }
};
