import * as React from 'react';
import * as PropTypes from 'prop-types';
import { SERVER_CONNECTION_PROBLEM } from '../../constants/connection';

interface IOwnProps {
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
    <strong>
      {SERVER_CONNECTION_PROBLEM}
    </strong>

  </div>;

ListError.propTypes = {
  onRetryFetch: PropTypes.func.isRequired,
};

export { ListError };
