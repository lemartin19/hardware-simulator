import * as ValueTypes from "./ValueTypes";

const sourceParser = (inputs) => {
  if (inputs !== "0" && inputs !== "1") {
    throw new Error(
      `expected only single-bit, binary digit for source, got: ${inputs}`
    );
  }

  return [Number(inputs)];
};

const notParser = (inputs) => {
  if (inputs.length !== 1)
    throw new Error(`expected only 1 input to 'not', got: ${inputs.length}`);

  return inputs.map(parse);
};

const andParser = (inputs) => {
  if (inputs.length !== 2)
    throw new Error(
      `expected exactly 2 inputs to 'and', got: ${inputs.length}`
    );

  return inputs.map(parse);
};

const orParser = (inputs) => {
  if (inputs.length !== 2)
    throw new Error(`expected exactly 2 inputs to 'or', got: ${inputs.length}`);

  return inputs.map(parse);
};

const findCloseParen = (logic) => {
  let idx = 1;
  let count = 1;
  while (count > 0) {
    if (logic.length <= idx)
      throw new Error("malformed command - no close paren");

    if (logic.charAt(idx) === "(") count += 1;
    if (logic.charAt(idx) === ")") count -= 1;
    idx++;
  }
  return idx;
};

const parseInputs = (logic) => {
  if (logic.length === 0) return [];

  const endIdx = logic.startsWith("(")
    ? findCloseParen(logic)
    : logic.indexOf(" ");
  const first = logic.slice(0, endIdx);
  const rest = logic.slice(endIdx + 1);

  return endIdx < 0 ? [logic] : [first, ...parseInputs(rest)];
};

export const parse = (logic) => {
  if (!logic.startsWith("(")) {
    return { type: ValueTypes.SOURCE, values: sourceParser(logic) };
  }

  const { cmd, rest } = logic.match(
    /^\((?<cmd>[a-z]+)( (?<rest>.+))?\)$/
  ).groups;
  const inputs = parseInputs(rest);

  switch (cmd) {
    case "not":
      return { type: ValueTypes.NOT, values: notParser(inputs) };
    case "and":
      return { type: ValueTypes.AND, values: andParser(inputs) };
    case "or":
      return { type: ValueTypes.OR, values: orParser(inputs) };
    default:
      throw new Error(`unexpected logical command, got: ${cmd}`);
  }
};
