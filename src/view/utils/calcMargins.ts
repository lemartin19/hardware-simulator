import { Command } from '../../model/Command';
import { Parsed } from '../../model/Parsed';

function calcMargin(
  idxFn: (values: Parsed['values']) => number,
  { type, values }: Parsed
): number {
  switch (type) {
    case Command.SOURCE:
    case Command.CLOCK:
      return 0;
    case Command.NOT:
    case Command.AND:
    case Command.OR:
    case Command.XOR:
      const idx = idxFn(values);
      const { marginTop, marginBottom } = calcMargins(values[idx]);
      const addedMargin = type === Command.NOT ? 0 : 4;
      return addedMargin + Math.max(marginTop, marginBottom);
    default:
      throw new Error(`unexpected type in calcMargin, got: ${type}`);
  }
}

export function calcMargins(parsed: Parsed) {
  return {
    marginTop: calcMargin(() => 0, parsed),
    marginBottom: calcMargin((vals) => vals.length - 1, parsed),
  };
}
