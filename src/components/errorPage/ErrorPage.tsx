import * as React from 'react';
import * as PropTypes from 'prop-types';
import { IAction } from '../../actions/IAction';
import '../../styles/errorWindow.css';

export interface IErrorPageDataProps {
  readonly detailErrorMessage: string;
  readonly errorId?: Guid;
  readonly errorMessage: string;
}

export interface IErrorPageCallbacksProps {
  readonly onReloadClick: (errorId?: Guid) => Promise<IAction>;
}

type ErrorPageProps = IErrorPageDataProps & IErrorPageCallbacksProps;

export class ErrorPage extends React.PureComponent<ErrorPageProps> {
  static displayName = 'ErrorPage';

  static propTypes = {
    detailErrorMessage: PropTypes.string.isRequired,
    onReloadClick: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired,
  };

  constructor(props: ErrorPageProps) {
    super(props);
  }

  _onReloadClick = (): Promise<IAction> =>
    this.props.onReloadClick(this.props.errorId);

  render() {
    return (
      <div>
        <div className="alert alert-danger">
          <p className="error-message">{this.props.errorMessage}</p>
          <p>Detailed error message:</p>
          {this.props.detailErrorMessage}
        </div>
        <button
          onClick={this._onReloadClick}
          className="btn btn-info btn-lg reload-button"
        >
          <span className="glyphicon glyphicon-refresh" />
          Reload
        </button>
      </div>
    );
  }
}
