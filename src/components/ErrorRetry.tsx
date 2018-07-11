import * as React from 'react';
import * as PropTypes from 'prop-types';

export interface IErrorRetryOwnProps {
  readonly retry: boolean;
}

export interface IErrorRetryDispatchProps {
  readonly onRetry: () => void;
}

interface IErrorRetryProps extends IErrorRetryOwnProps, IErrorRetryDispatchProps {}

export const ErrorRetry: React.StatelessComponent<IErrorRetryProps>
  = ({ retry, onRetry }: IErrorRetryProps) => {
  return retry
    ? <span className="glyphicon glyphicon-repeat floatRight" onClick={onRetry} />
    : null;
};

ErrorRetry.displayName = 'ErrorRetry';

ErrorRetry.propTypes = {
  retry: PropTypes.bool,
  onRetry: PropTypes.func.isRequired,
};
