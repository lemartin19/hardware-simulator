import { PropsWithChildren } from 'react';
import { Alert } from 'react-bootstrap';

const MaybeError = ({ children }: PropsWithChildren<{}>) =>
  children ? <Alert variant="danger">{children}</Alert> : null;
MaybeError.displayName = 'MaybeError';

export default MaybeError;
