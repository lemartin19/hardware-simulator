import { calculate } from './calculator';
import * as ValueTypes from './ValueTypes';

describe('/model/calculator', () => {
  test('source result is the source value', () => {
    const result = calculate({ type: ValueTypes.SOURCE, values: [1, 0, 1] }, 0);
    expect(result).toEqual([1, 0, 1]);
  });

  test('clock result is the clock value passed in', () => {
    const result0 = calculate({ type: ValueTypes.CLOCK, values: [] }, 0);
    expect(result0).toEqual([0]);
    expect(result0[0]).toBe(0);

    const result1 = calculate({ type: ValueTypes.CLOCK, values: [] }, 1);
    expect(result1).toEqual([1]);
  });

  describe('not', () => {
    test('opposite of source', () => {
      const result = calculate(
        {
          type: ValueTypes.NOT,
          values: [{ type: ValueTypes.SOURCE, values: [1, 0, 0, 1] }],
        },
        0
      );
      expect(result).toEqual([0, 1, 1, 0]);
    });

    test('opposite of clock', () => {
      const result = calculate(
        {
          type: ValueTypes.NOT,
          values: [{ type: ValueTypes.CLOCK, values: [] }],
        },
        0
      );
      expect(result).toEqual([1]);
    });

    test('opposite of gate input', () => {
      const result = calculate(
        {
          type: ValueTypes.NOT,
          values: [
            {
              type: ValueTypes.AND,
              values: [
                { type: ValueTypes.CLOCK, values: [] },
                { type: ValueTypes.SOURCE, values: [1] },
              ],
            },
          ],
        },
        1
      );
      expect(result).toEqual([0]);
    });
  });

  describe('or', () => {
    test('sources are not changed by clock', () => {
      const result110 = calculate(
        {
          type: ValueTypes.OR,
          values: [
            { type: ValueTypes.SOURCE, values: [0, 1, 0] },
            { type: ValueTypes.SOURCE, values: [1, 1, 0] },
          ],
        },
        1
      );
      expect(result110).toEqual([1, 1, 0]);

      const result11 = calculate(
        {
          type: ValueTypes.OR,
          values: [
            { type: ValueTypes.SOURCE, values: [0, 0] },
            { type: ValueTypes.SOURCE, values: [1, 1] },
          ],
        },
        0
      );
      expect(result11).toEqual([1, 1]);
    });
  });

  describe('xor', () => {
    test('both on is off', () => {
      const result = calculate(
        {
          type: ValueTypes.XOR,
          values: [
            { type: ValueTypes.SOURCE, values: [1] },
            { type: ValueTypes.SOURCE, values: [1] },
          ],
        },
        1
      );
      expect(result).toEqual([0]);
    });

    test('both off is off', () => {
      const result = calculate(
        {
          type: ValueTypes.XOR,
          values: [
            { type: ValueTypes.SOURCE, values: [0] },
            { type: ValueTypes.SOURCE, values: [0] },
          ],
        },
        1
      );
      expect(result).toEqual([0]);
    });

    test('one on is on', () => {
      const result = calculate(
        {
          type: ValueTypes.XOR,
          values: [
            { type: ValueTypes.SOURCE, values: [0] },
            { type: ValueTypes.SOURCE, values: [1] },
          ],
        },
        1
      );
      expect(result).toEqual([1]);
    });
  });

  describe('and', () => {
    test('with clock on', () => {
      const result = calculate(
        {
          type: ValueTypes.AND,
          values: [
            { type: ValueTypes.CLOCK, values: [] },
            { type: ValueTypes.SOURCE, values: [1] },
          ],
        },
        1
      );
      expect(result).toEqual([1]);
    });

    test('with clock off', () => {
      const result = calculate(
        {
          type: ValueTypes.AND,
          values: [
            { type: ValueTypes.CLOCK, values: [] },
            { type: ValueTypes.SOURCE, values: [1] },
          ],
        },
        0
      );
      expect(result).toEqual([0]);
    });

    test('complicated inputs', () => {
      const result = calculate(
        {
          type: ValueTypes.AND,
          values: [
            {
              type: ValueTypes.OR,
              values: [
                {
                  type: ValueTypes.NOT,
                  values: [{ type: ValueTypes.CLOCK, values: [] }],
                },
                { type: ValueTypes.CLOCK, values: [] },
              ],
            },
            { type: ValueTypes.SOURCE, values: [1] },
          ],
        },
        1
      );
      expect(result).toEqual([1]);
    });
  });
});
