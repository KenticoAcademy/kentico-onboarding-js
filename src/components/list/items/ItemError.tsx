import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ListError } from '../../../models/ListError';
import { IListAction } from '../../../actions/types/IListAction';
import { Retry } from '../../icons/retry';
import { Close } from '../../icons/close';
import { ErrorType } from '../../../models/ErrorType';

export interface IItemErrorOwnProps {
  readonly error: ListError;
}

export interface IItemErrorDispatchProps {
  readonly retry: () => void;
  readonly closeError: () => IListAction;
}

type ItemErrorProps = IItemErrorOwnProps & IItemErrorDispatchProps;

export class ItemError extends React.PureComponent<ItemErrorProps> {
  static displayName = 'ErrorItem';
  static propTypes = {
    error: PropTypes.object.isRequired,
    retry: PropTypes.func.isRequired,
    closeError: PropTypes.func.isRequired,
  };

  _getErrorMessage = (): string => {
    switch (this.props.error.action) {
      case ErrorType.SAVE:
        return 'Updating of this item failed.';
      case ErrorType.DELETE:
        return 'Something went wrong while deleting this item.';
      case ErrorType.ADD:
        return 'Creating new item failed.';
      default:
        return 'Sorry, something were wrong.';
    }
  };

  render(): JSX.Element {
    return (
      <div className="float-right d-flex">
        <div className="text-danger font-weight-bold mr-2">
          {this._getErrorMessage()}
        </div>
        <button
          onClick={this.props.retry}
          className="btn btn-outline-danger btn-sm border-0"
        >
          <Retry />
        </button>
        <button
          onClick={this.props.closeError}
          className="btn btn-outline-danger btn-sm border-0"
        >
          <Close />
        </button>
      </div>
    );
  }
}
