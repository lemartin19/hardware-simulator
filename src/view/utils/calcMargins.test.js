import { Command } from '../../model/Command';
import { calcMargins } from './calcMargins';

const SOURCE_0 = {
  type: Command.SOURCE,
  values: [0],
};

describe('/view/utils/calcMargins', () => {
  test('source margins are 0', () => {
    const { marginTop, marginBottom } = calcMargins(SOURCE_0);
    expect(marginTop).toBe(0);
    expect(marginBottom).toBe(0);
  });

  test('one gate adds to margins', () => {
    const AND = {
      type: Command.AND,
      values: [SOURCE_0, SOURCE_0],
    };
    const { marginTop, marginBottom } = calcMargins(AND);
    expect(marginTop).toBe(4);
    expect(marginBottom).toBe(4);
  });

  test('not gate gets same margins as source child', () => {
    const NOT = {
      type: Command.NOT,
      values: [SOURCE_0, SOURCE_0],
    };
    const { marginTop, marginBottom } = calcMargins(NOT);
    expect(marginTop).toBe(0);
    expect(marginBottom).toBe(0);
  });

  test('not gate gets same margins as gate child', () => {
    const NOT = {
      type: Command.NOT,
      values: [
        {
          type: Command.AND,
          values: [SOURCE_0, SOURCE_0],
        },
        SOURCE_0,
      ],
    };
    const { marginTop, marginBottom } = calcMargins(NOT);
    expect(marginTop).toBe(4);
    expect(marginBottom).toBe(0);
  });
});
