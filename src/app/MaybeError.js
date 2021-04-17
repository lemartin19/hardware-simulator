import { Alert } from 'react-bootstrap';

const MaybeError = ({ children }) =>
  children && children.length ? (
    <Alert variant="danger">{children}</Alert>
  ) : null;
MaybeError.displayName = 'MaybeError';

export default MaybeError;
