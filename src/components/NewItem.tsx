import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Shortcuts } from 'react-shortcuts';

import { isInputValid } from '../utils/validationService';
import { IAction } from '../@types/IAction';
import {
  ITEM_EDIT_CONFIRM,
  ITEM_EDIT_CANCEL,
  ITEM_DELETE,
} from '../constants/constants';

export interface INewItemState {
  itemValue: string;
}

export interface INewItemProps {
  readonly addItem: (value: string) => IAction;
}

export class NewItem extends React.PureComponent<INewItemProps, INewItemState> {
  static displayName = 'NewItem';

  static propTypes = {
    addItem: PropTypes.func.isRequired,
  };

  constructor(props: INewItemProps) {
    super(props);

    this.state = {
      itemValue: '',
    };
  }

  _clearItemValue = (): void => this.setState({ itemValue: '' });

  _handleShortcuts = (action: string): void => {
    switch (action) {
      case ITEM_EDIT_CONFIRM:
        if (isInputValid(this.state.itemValue)) {
          this._addItem();
        }
        break;
      case ITEM_EDIT_CANCEL:
      case ITEM_DELETE:
        this._clearItemValue();
        break;
      default:
        break;
    }
  };

  _handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => this.setState({ itemValue: event.target.value });

  _addItem = (): void => {
    this.props.addItem(this.state.itemValue);
    this.setState({ itemValue: '' });
  };

  render() {
    const { itemValue } = this.state;

    return (
      <Shortcuts name="NewItem" handler={this._handleShortcuts}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="What is on your mind ... ?"
            value={itemValue}
            onChange={this._handleChange}
          />
          <span className="input-group-btn">
            <button
              type="button"
              className="btn btn-default"
              onClick={this._addItem}
              disabled={!isInputValid(itemValue)}
            > Add
            </button>
          </span>
        </div>
      </Shortcuts>
    );
  }
}
