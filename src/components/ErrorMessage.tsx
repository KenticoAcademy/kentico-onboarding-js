import * as React from 'react';
import { ValidationMap } from 'prop-types';
import * as PropTypes from 'prop-types';

export type ErrorMessageOwnProps = {
  readonly classNames: string,
  readonly error: string | null,
  readonly tooltip?: string | null,
};

type ErrorMessageProps = ErrorMessageOwnProps;

const errorMessagePropTypes: ValidationMap<ErrorMessageProps> = {
  classNames: PropTypes.string.isRequired,
  error: PropTypes.string,
  tooltip: PropTypes.string,
};

export const ErrorMessage: React.StatelessComponent<ErrorMessageProps> = ({ classNames, error, tooltip }): JSX.Element | null => {
  if (error === null) {
    return null;
  }

  return (
    <span
      className={classNames}
      role="alert"
      data-toggle="tooltip"
      data-placement="top"
      title={tooltip === null ? undefined : tooltip}
    >
      {error}
    </span>
  );
};

ErrorMessage.displayName = 'ErrorMessage';
ErrorMessage.propTypes = errorMessagePropTypes;
