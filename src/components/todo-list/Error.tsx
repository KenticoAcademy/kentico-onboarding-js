import * as React from 'react';
import { PropTypes } from 'react';

export interface IErrorDataProps {
  readonly errorMessage: string;
}

export interface IErrorCallbackProps {
  readonly onErrorClose: () => void;
}

export class Error extends React.PureComponent<IErrorDataProps & IErrorCallbackProps> {
  static propTypes = {
    errorMessage: PropTypes.string.isRequired,
    onErrorClose: PropTypes.func.isRequired,
  };

  constructor(props: IErrorDataProps & IErrorCallbackProps) {
    super(props);
  }

  render() {
    return (
      <div className="alert alert-danger alert-dismissable fade in">
        <span
          className="glyphicon glyphicon-warning-sign"
          aria-hidden="true"
        />
        <button
          className="close"
          data-dismiss="alert"
          aria-label="close"
          onClick={this._closeError}
        >&times;</button>
        <strong> ERROR: </strong>
        {this.props.errorMessage}
      </div>
    );
  };

  private _closeError = (): void => {
    this.props.onErrorClose();
  }
}
