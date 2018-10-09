import * as React from 'react';
import { ValidationMap } from 'prop-types';
import * as PropTypes from 'prop-types';

export type ErrorMessageOwnProps = {
  readonly classNames: string,
  readonly error: string,
  readonly tooltip: string,
};

type ErrorMessageProps = ErrorMessageOwnProps;

const errorMessagePropTypes: ValidationMap<ErrorMessageProps> = {
  classNames: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  tooltip: PropTypes.string.isRequired,
};

export const ErrorMessage: React.StatelessComponent<ErrorMessageProps> = ({ classNames, error, tooltip }): JSX.Element | null => {
  if (error === '') {
    return null;
  }

  return (
    <span
      className={classNames}
      role="alert"
      data-toggle="tooltip"
      data-placement="top"
      title={tooltip}
    >
      {error}
    </span>
  );
};

ErrorMessage.displayName = 'ErrorMessage';
ErrorMessage.propTypes = errorMessagePropTypes;
