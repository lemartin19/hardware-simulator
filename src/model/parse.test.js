import { parse } from './parse';
import * as ValueTypes from './ValueTypes';

const testSourceVal = (type, values, val) => {
  expect(type).toBe(ValueTypes.SOURCE);
  expect(values.length).toBe(1);
  expect(values[0]).toBe(val);
};

describe('/model/parse', () => {
  describe('sources', () => {
    test('gets single bit', () => {
      const { type: type0, values: values0 } = parse('0');
      testSourceVal(type0, values0, 0);

      const { type: type1, values: values1 } = parse('1');
      testSourceVal(type1, values1, 1);
    });

    test('errors for non-binary digits', () => {
      let result;

      try {
        parse('8');
      } catch (error) {
        result = error.message;
      } finally {
        expect(result).toBe('expected only binary digits in source, got: 8');
      }
    });
  });

  describe('gate', () => {
    test('with source inputs', () => {
      const { type, values } = parse('(and 0 1)');
      expect(type).toBe(ValueTypes.AND);
      expect(values.length).toBe(2);
      values.forEach(({ type, values }, idx) => {
        testSourceVal(type, values, idx);
      });
    });

    test('with gate inputs', () => {
      const { type, values } = parse('(or (and 1 (not 0)) (xor 1 1))');
      expect(type).toBe(ValueTypes.OR);
      expect(values.length).toBe(2);
      expect(values[0].type).toBe(ValueTypes.AND);
      expect(values[0].values.length).toBe(2);
      testSourceVal(values[0].values[0].type, values[0].values[0].values, 1);
      expect(values[0].values[1].type).toBe(ValueTypes.NOT);
      testSourceVal(
        values[0].values[1].values[0].type,
        values[0].values[1].values[0].values,
        0
      );
      expect(values[1].type).toBe(ValueTypes.XOR);
      testSourceVal(values[1].values[0].type, values[1].values[0].values, 1);
    });
  });

  describe('clock', () => {
    test('has no values', () => {
      const { type, values } = parse('(clk)');
      expect(type).toBe(ValueTypes.CLOCK);
      expect(values.length).toBe(0);
    });
  });
});
