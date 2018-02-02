import * as React from 'react';
import * as PropTypes from 'prop-types';

export interface ITryAgainCallbackProps {
  readonly retryAction: () => void;
}

export class TryAgain extends React.PureComponent<ITryAgainCallbackProps> {
  static displayName = 'TryAgain';

  static propTypes  = {
    retryAction: PropTypes.func.isRequired,
  };

  render() {
    return (
      <button
        className="btn btn-outline-secondary"
        onClick={this.props.retryAction}
      >
        Try again
      </button>
    );
  }
}
