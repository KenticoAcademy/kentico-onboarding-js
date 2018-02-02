import * as React from 'react';
import * as PropTypes from 'prop-types';

interface SuccessDataProps {
  readonly message: string;
}

const propTypes = {
  message: PropTypes.string.isRequired,
};

const Success: React.SFC<SuccessDataProps> = ({ message }) =>
  <div className="alert alert-success">
    <h1>
      {message}
    </h1>
  </div>;

Success.displayName = 'Success';
Success.propTypes = propTypes;

export { Success };
