import * as React from 'react';
import { ValidationMap } from 'prop-types';
import * as PropTypes from 'prop-types';

export type ErrorMessageOwnProps = {
  readonly error: string,
};

type ErrorMessageProps = ErrorMessageOwnProps;

const errorMessagePropTypes: ValidationMap<ErrorMessageProps> = {
  error: PropTypes.string.isRequired,
};

export const ErrorMessage: React.StatelessComponent<ErrorMessageProps> = ({ error }): JSX.Element => {
  return (
    <div className="alert alert-danger error-message" role="alert">
      {error}
    </div>
  );
};

ErrorMessage.displayName = 'ErrorMessage';
ErrorMessage.propTypes = errorMessagePropTypes;
