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
  <span>
    <button onClick={retryAction}>
      Retry
    </button>
    {description}
  </span>;

Retry.displayName = 'Retry';
Retry.propTypes = {
  retryAction: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
};

export { Retry };
