import * as React from 'react';
import * as PropTypes from 'prop-types';

export interface IRetryCallbackProps {
  readonly retryAction: () => void;
}

export interface IRetryOwnProps {
  readonly description?: string;
}

export interface IRetryProps extends IRetryCallbackProps, IRetryOwnProps {
}

const Retry: React.SFC<IRetryProps> = ({ retryAction, description }) =>
  <div className="input-group">
    <div className="p-2 text-danger">
      {description}
    </div>
    <div className="float-right">
      <button
        className="btn btn-primary"
        onClick={retryAction}
      >
        Try again
      </button>
    </div>
  </div>;

Retry.displayName = 'Retry';
Retry.propTypes = {
  retryAction: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
};

export { Retry };
