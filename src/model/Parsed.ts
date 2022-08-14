import { Command } from './Command';

export type Binary = 0 | 1;

export interface ParsedSource {
  type: Command.SOURCE;
  values: Binary[];
}

export interface ParsedGate {
  type: Command.NOT | Command.AND | Command.OR | Command.XOR;
  values: Parsed[];
}

export interface ParsedClock {
  type: Command.CLOCK;
  values: never[];
}

export type Parsed = ParsedSource | ParsedGate | ParsedClock;

export function isBinaryDigit(digit: number): digit is Binary {
  return digit === 0 || digit === 1;
}

export function isParsedSource(parsed: Parsed): parsed is ParsedSource {
  return parsed.type === Command.SOURCE;
}

export function isParsedGate(parsed: Parsed): parsed is ParsedGate {
  return (
    parsed.type === Command.NOT ||
    parsed.type === Command.AND ||
    parsed.type === Command.OR ||
    parsed.type === Command.XOR
  );
}

export function isParsedClock(parsed: Parsed): parsed is ParsedClock {
  return parsed.type === Command.CLOCK;
}
