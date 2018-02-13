import * as React from 'react';
import * as PropTypes from 'prop-types';

interface OwnProps {
  readonly errorMessage: string;
  readonly onCloseError: () => any;
}

const Error: React.SFC<OwnProps> = (props: OwnProps): JSX.Element =>
  <div className="alert alert-danger alert-dismissable fade in">
    <span
      className="glyphicon glyphicon-warning-sign"
      aria-hidden="true"
    />
    <button
      className="close"
      data-dismiss="alert"
      aria-label="close"
      onClick={props.onCloseError}
    >&times;</button>
    <strong> ERROR: </strong>
    {props.errorMessage}
  </div>;

Error.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  onCloseError: PropTypes.func.isRequired,
};

export { Error }
