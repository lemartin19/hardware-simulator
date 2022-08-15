import './Gates.css';

import { PropsWithChildren, ReactNode } from 'react';
import { HorizontalWire, VerticalWire } from '../wires/Wires';
import { Command } from '../../model/Command';

export const Source = ({ val }: { val: string }) => (
  <div className="flex-row">
    <div className="SOURCE unit">{val}</div>
    <HorizontalWire />
  </div>
);
Source.displayName = 'Source';

const Input = ({
  marginTop,
  marginBottom,
  children,
}: {
  marginTop: number;
  marginBottom: number;
  children: ReactNode[];
}) => {
  return children.length <= 1 ? (
    <>{children}</>
  ) : (
    <>
      <VerticalWire marginTop={marginTop} marginBottom={marginBottom}>
        {children}
      </VerticalWire>
      <HorizontalWire />
    </>
  );
};
Input.displayName = 'Input';

export const Gate = ({
  type,
  marginTop,
  marginBottom,
  children,
}: {
  type: Command;
  marginTop: number;
  marginBottom: number;
  children: ReactNode[];
}) => (
  <div className="flex-row">
    <Input marginTop={marginTop} marginBottom={marginBottom}>
      {children}
    </Input>
    <div className={`${type} unit`}>{type}</div>
    <HorizontalWire />
  </div>
);
Gate.displayName = 'Gate';

export const Clock = ({ val }: { val: string }) => (
  <div className="flex-row">
    <div className="clk unit">{val}</div>
    <HorizontalWire />
  </div>
);
Clock.displayName = 'Clock';

export const Out = ({
  val,
  children,
}: PropsWithChildren<{
  val: string;
}>) => (
  <div className="flex-row">
    <div>{children}</div>
    <div className="OUT unit">{val}</div>
  </div>
);
Out.displayName = 'Out';
