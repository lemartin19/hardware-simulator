import { parse } from './parse';
import { Command } from './Command';

const testSourceVal = (type, values, val) => {
  expect(type).toBe(Command.SOURCE);
  expect(values).toEqual(val);
};

describe('/model/parse', () => {
  describe('sources', () => {
    test('gets single bit', () => {
      const { type: type0, values: values0 } = parse('0');
      testSourceVal(type0, values0, [0]);

      const { type: type1, values: values1 } = parse('1');
      testSourceVal(type1, values1, [1]);
    });

    test('gets many bits', () => {
      const { type: type0, values: values0 } = parse('0101010');
      testSourceVal(type0, values0, [0, 1, 0, 1, 0, 1, 0]);

      const { type: type1, values: values1 } = parse('111');
      testSourceVal(type1, values1, [1, 1, 1]);
    });

    test('errors for non-binary digits', () => {
      expect(() => parse('8')).toThrowError(
        new Error(
          `expected every source input to be a binary digit (0 or 1), received '8'`
        )
      );
    });
  });

  describe('gate', () => {
    test('errors for too few arguments', () => {
      expect(() => parse('(and 1)')).toThrowError(
        new Error(`expected at least 2 inputs to 'and', got: 1`)
      );
    });

    test('can handle many inputs', () => {
      const { type, values } = parse('(and 0 1 (or 1 1 (not 0)))');
      expect(type).toBe(Command.AND);
      expect(values.length).toBe(3);
    });

    test('with source inputs', () => {
      const { type, values } = parse('(and 0 1)');
      expect(type).toBe(Command.AND);
      expect(values.length).toBe(2);
      values.forEach(({ type, values }, idx) => {
        testSourceVal(type, values, [idx]);
      });
    });

    test('with gate inputs', () => {
      const { type, values } = parse('(or (and 1 (not 0)) (xor 1 1))');
      expect(type).toBe(Command.OR);
      expect(values.length).toBe(2);
      expect(values[0].type).toBe(Command.AND);
      expect(values[0].values.length).toBe(2);
      expect(values[0].values[1].type).toBe(Command.NOT);
      expect(values[1].type).toBe(Command.XOR);
    });
  });

  describe('clock', () => {
    test('has no values', () => {
      const { type, values } = parse('(clk)');
      expect(type).toBe(Command.CLOCK);
      expect(values.length).toBe(0);
    });
  });
});
