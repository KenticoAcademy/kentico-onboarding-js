import * as React from 'react';
import * as PropTypes from 'prop-types';

import { Key } from '../@types/Key';

export interface IErrorStateProps {
  readonly error: string;
  readonly itemKey: Key;
}

export interface IErrorDispatchProps {
  readonly onDismiss: () => void;
}

interface IErrorProps extends IErrorStateProps, IErrorDispatchProps {}

export const Error: React.StatelessComponent<IErrorProps>
  = ({ error, onDismiss }) => (
  (error) ? (
    <div className="alert alert-danger" onClick={onDismiss}>
      <strong>ERROR</strong> {error}
    </div>
  ) : null
);

Error.displayName = 'Error';

Error.propTypes = {
  error: PropTypes.string,
  itemKey: PropTypes.string,
  onDismiss: PropTypes.func.isRequired,
};
