import * as React from 'react';
import * as PropTypes from 'prop-types';

interface ErrorDataProps {
  readonly message: string;
}

const propTypes = {
  message: PropTypes.string.isRequired,
};

const Error: React.SFC<ErrorDataProps> = ({ message }) => (
  <div className="alert alert-danger mb-3">
    <h1>
      {message}
    </h1>
  </div>
);

Error.displayName = 'Error';
Error.propTypes = propTypes;

export { Error };
