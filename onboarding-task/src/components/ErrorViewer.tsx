import * as React from 'react';
import * as Immutable from 'immutable';
const ImmutablePropTypes = require('react-immutable-proptypes');

import { ErrorMessage, IErrorMessage } from '../models/ErrorMessage';

interface IErrorViewerDataProps {
  errorList: Immutable.OrderedMap<string, ErrorMessage>;
}

interface IErrorViewerCallbacksProps {
  onErrorClose: (id: string) => void;
}

const ErrorMessageNotification: React.StatelessComponent<{ error: IErrorMessage, onErrorClose: () => void }> = (props) => {

  return (<div className="alert alert-danger">
    { props.error.message }
    <div className="glyphicon glyphicon-remove pull-right" onClick={props.onErrorClose} />
  </div>);
};

// React.StatelessComponent cannot be used with return type 'JSX.Element | null' yet
// see issue https://github.com/Microsoft/TypeScript/issues/11955
class ErrorViewer extends React.Component<IErrorViewerDataProps & IErrorViewerCallbacksProps, undefined> {
  static displayName = 'ErrorViewer';

  static propTypes = {
    errorList: ImmutablePropTypes.orderedMapOf(
      React.PropTypes.shape({
        message: React.PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
    onErrorClose: React.PropTypes.func.isRequired,
  };

  _closeError = (id: string) => () => this.props.onErrorClose(id);

  render() {
    if (!this.props.errorList) {
      return null;
    }

    const errors = this.props.errorList
      .map((error: ErrorMessage) =>
        <ErrorMessageNotification error={error} onErrorClose={this._closeError(error.id)} key={error.id}/>
      )
      .toIndexedSeq();

    return (
      <div>
        {errors}
      </div>);
  }
}


export { ErrorViewer, IErrorViewerDataProps, IErrorViewerCallbacksProps };
