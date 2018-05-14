import * as React from 'react';
import * as PropTypes from 'prop-types';

import { IAction } from '../@types/IAction';

export interface IListGroupActionsStateProps {
  readonly selectedKeys: Array<Key>;
}

export interface IListGroupActionsDispatchProps {
  readonly saveSelected: (selectedKeys: Array<Key>) => IAction;
  readonly cancelSelected: (selectedKeys: Array<Key>) => IAction;
  readonly deleteSelected: (selectedKeys: Array<Key>) => IAction;
}

interface IListGroupActionsProps extends IListGroupActionsStateProps, IListGroupActionsDispatchProps {}

export class ListGroupActions extends React.PureComponent<IListGroupActionsProps> {
  static displayName = 'ListGroupActions';

  static propTypes = {
    selectedKeys: PropTypes.array.isRequired,
    saveSelected: PropTypes.func.isRequired,
    cancelSelected: PropTypes.func.isRequired,
    deleteSelected: PropTypes.func.isRequired,
  };

  _saveSelected = (): IAction => this.props.saveSelected(this.props.selectedKeys);

  _cancelSelected = (): IAction => this.props.cancelSelected(this.props.selectedKeys);

  _deleteSelected = (): IAction => this.props.deleteSelected(this.props.selectedKeys);

  render() {
    const { selectedKeys } = this.props;

    return (
      (selectedKeys.length > 1) ? (
        <div className="row">
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-primary"
              onClick={this._saveSelected}
            >
              Save Selected
            </button>
            <button
              type="button"
              className="btn btn-default"
              onClick={this._cancelSelected}
            >
              Cancel Selected
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={this._deleteSelected}
            >
              Delete Selected
            </button>
          </div>
        </div>
      ) : null
    );
  }
}
