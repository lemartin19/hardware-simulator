import { PropsWithChildren } from 'react';
import { Alert } from 'react-bootstrap';

export const MaybeError = ({ children }: PropsWithChildren<{}>) =>
  children ? <Alert variant="danger">{children}</Alert> : null;
MaybeError.displayName = 'MaybeError';
