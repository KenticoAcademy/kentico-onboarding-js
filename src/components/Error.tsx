import * as React from 'react';
import * as PropTypes from 'prop-types';
import { TryAgain } from '../components/TryAgain';

interface ErrorDataProps {
  readonly message: string;
  readonly showRetry?: boolean;
}

const propTypes = {
  message: PropTypes.string.isRequired,
  showRetry: PropTypes.bool,
};

const defaultProps = {
  showRetry: false,
};

const Error: React.SFC<ErrorDataProps> = ({ message, showRetry }) => (
  <div className="mb-3">
    <div className="alert alert-danger">
      <h1>
        {message}
      </h1>
    </div>
    {showRetry && <TryAgain />}
  </div>
);

Error.displayName = 'Error';
Error.propTypes = propTypes;
Error.defaultProps = defaultProps;

export { Error };
