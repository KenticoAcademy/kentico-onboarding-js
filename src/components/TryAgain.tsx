import * as React from 'react';
import * as PropTypes from 'prop-types';

export class TryAgain extends React.PureComponent {
  static displayName = 'TryAgain';

  static propTypes  = {
    retryAction: PropTypes.func.isRequired,
  };

  render() {
    return (
      <button
        className="btn btn-outline-secondary"
      >
        Try again
      </button>
    );
  }
}
