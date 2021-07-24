import * as ValueTypes from './ValueTypes';

const sourceParser = (inputs) => {
  const inputArr = inputs.split('');
  if (inputArr.some((input) => input !== '0' && input !== '1')) {
    throw new Error(`expected only binary digits in source, got: ${inputs}`);
  }

  return inputArr.map(Number);
};

const notParser = (inputs) => {
  if (inputs.length !== 1) {
    throw new Error(`expected 1 input to 'not', got: ${inputs.length}`);
  }

  return inputs.map(parse);
};

const multiInputGateParser = (name, inputs) => {
  if (inputs.length < 2) {
    throw new Error(
      `expected at least 2 inputs to '${name}', got: ${inputs.length}`
    );
  }

  return inputs.map(parse);
};

const clkParser = (inputs) => {
  if (inputs.length !== 0) {
    throw new Error(
      `expected 0 inputs to 'clk', got: ${inputs.length}`
    );
  }

  return [];
};

const findCloseParen = (logic) => {
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

const parseInputs = (logic) => {
  if (logic.length === 0) return [];

  const endIdx = logic.startsWith('(')
    ? findCloseParen(logic)
    : logic.indexOf(' ');
  const first = logic.slice(0, endIdx);
  const rest = logic.slice(endIdx + 1);

  return endIdx < 0 ? [logic] : [first, ...parseInputs(rest)];
};

export const parse = (logic) => {
  if (!logic.startsWith('(')) {
    return { type: ValueTypes.SOURCE, values: sourceParser(logic) };
  }

  const { cmd, rest } = logic.match(/^\((?<cmd>[a-z]+) ?(?<rest>.*)\)$/).groups;
  const inputs = parseInputs(rest);

  switch (cmd) {
    case 'not':
      return { type: ValueTypes.NOT, values: notParser(inputs) };
    case 'and':
      return {
        type: ValueTypes.AND,
        values: multiInputGateParser(cmd, inputs),
      };
    case 'or':
      return {
        type: ValueTypes.OR,
        values: multiInputGateParser(cmd, inputs),
      };
    case 'xor':
      return {
        type: ValueTypes.XOR,
        values: multiInputGateParser(cmd, inputs),
      };
    case 'clk':
      return { type: ValueTypes.CLOCK, values: clkParser(inputs) };
    default:
      throw new Error(`unexpected logical command, got: ${cmd}`);
  }
};
