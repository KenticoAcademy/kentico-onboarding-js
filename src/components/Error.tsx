import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ErrorRetry } from '../containers/ErrorRetry';

export interface IErrorOwnProps {
  readonly itemKey: Key;
  readonly retry: boolean;
}

export interface IErrorStateProps {
  readonly error: string;
}

export interface IErrorDispatchProps {
  readonly onDismiss: () => void;
}

interface IErrorProps extends IErrorOwnProps, IErrorStateProps, IErrorDispatchProps {}

export const Error: React.StatelessComponent<IErrorProps>
  = ({ error, onDismiss, retry }: IErrorProps) => {
    return error
      ? <div className="alert alert-danger" onClick={onDismiss}>
          <strong>ERROR</strong> {error} <ErrorRetry retry={retry} />
        </div>
      : null;
  };

Error.displayName = 'Error';

Error.propTypes = {
  error: PropTypes.string,
  itemKey: PropTypes.string.isRequired,
  retry: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func.isRequired,
};
