import * as React from 'react';
import * as PropTypes from 'prop-types';

interface IOwnProps {
  readonly errorMessage: string;
  readonly onRetryFetch: () => void;
}

const ListError: React.StatelessComponent<IOwnProps> = (props: IOwnProps): JSX.Element =>
  <div className="alert alert-danger alert-dismissable fade in">
    <span
      className="glyphicon glyphicon-warning-sign"
      aria-hidden="true"
    />
    <button
      className="close"
      data-dismiss="alert"
      aria-label="close"
      onClick={props.onRetryFetch}
    >
      &#8634;
    </button>
    <strong> ERROR: </strong>
    {props.errorMessage}
  </div>;

ListError.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  onRetryFetch: PropTypes.func.isRequired,
};

export { ListError };
