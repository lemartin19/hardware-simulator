import { render } from '@testing-library/react';
import { Workspace } from './Workspace';
import { Command } from '../model/Command';

test('renders nothing if no parsed value', () => {
  const { container } = render(<Workspace />);
  expect(container.children.length).toBe(1);
  expect(container.firstChild.firstChild).toBe(null);
});

test('renders view if there is a parsed value', () => {
  const { container } = render(
    <Workspace parsed={{ type: Command.SOURCE, values: [0] }} result="0" />
  );
  expect(container.children.length).toBe(1);
  expect(container.firstChild.firstChild).not.toBeNull();
});
