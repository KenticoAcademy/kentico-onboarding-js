import * as React from 'react';
import * as PropTypes from 'prop-types';
import { WeakValidationMap } from 'react';

type ErrorMessageOwnProps = {
  readonly classNames: string,
  readonly error: string,
  readonly tooltip?: string,
};

type ErrorMessageProps = ErrorMessageOwnProps;

const errorMessagePropTypes: WeakValidationMap<ErrorMessageProps> = {
  classNames: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  tooltip: PropTypes.string,
};

export const ErrorMessage: React.FunctionComponent<ErrorMessageProps> = ({ classNames, error, tooltip }) => (
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

ErrorMessage.displayName = 'ErrorMessage';
ErrorMessage.propTypes = errorMessagePropTypes;
