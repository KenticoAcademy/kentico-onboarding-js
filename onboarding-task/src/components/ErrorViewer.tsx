import * as React from 'react';
import * as Immutable from 'immutable';
const ImmutablePropTypes = require('react-immutable-proptypes');

import { ErrorMessage, IErrorMessage } from '../models/ErrorMessage';

interface IErrorViewerDataProps {
  errorList: Immutable.OrderedMap<string, ErrorMessage>;
}

const ErrorMessageNotification: React.StatelessComponent<{ error: IErrorMessage }> = (props) => (
  <div className="alert alert-danger">
    { props.error.message }
  </div>);

// React.StatelessComponent cannot be used with return type 'JSX.Element | null' yet
// see issue https://github.com/Microsoft/TypeScript/issues/11955
class ErrorViewer extends React.Component<IErrorViewerDataProps, undefined> {
  static displayName = 'ErrorViewer';

  static propTypes = {
    errorList: ImmutablePropTypes.orderedMapOf(
      React.PropTypes.shape({
        message: React.PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
  };

  render() {
    if (!this.props.errorList) {
      return null;
    }

    const errors = this.props.errorList
      .map((error: ErrorMessage, id: string) => <ErrorMessageNotification error={error} key={id}/>)
      .toIndexedSeq();

    return (
      <div>
        {errors}
      </div>);
  }
}


export { ErrorViewer, IErrorViewerDataProps };
