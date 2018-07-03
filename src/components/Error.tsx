import * as React from 'react';
import * as PropTypes from 'prop-types';

export interface IErrorStateProps {
  readonly error: string;
  readonly itemKey: Key;
  readonly retry: boolean;
}

export interface IErrorDispatchProps {
  readonly onDismiss: () => void;
  readonly onRetry: () => void;
}

interface IErrorProps extends IErrorStateProps, IErrorDispatchProps {}

export const Error: React.StatelessComponent<IErrorProps>
  = ({ error, onDismiss, retry, onRetry }) => {
    const retryClass = { float: 'right' };
    const retrySpan = retry ? <span className="glyphicon glyphicon-repeat" style={retryClass} onClick={onRetry} /> : null;

    return error ?
      <div className="alert alert-danger" onClick={onDismiss}>
        <strong>ERROR</strong> {error} {retrySpan}
      </div>
      : null;
  };


Error.displayName = 'Error';

Error.propTypes = {
  error: PropTypes.string,
  itemKey: PropTypes.string,
  retry: PropTypes.bool,
  onRetry: PropTypes.func.isRequired,
  onDismiss: PropTypes.func.isRequired,
};
