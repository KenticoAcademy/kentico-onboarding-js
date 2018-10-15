import * as React from 'react';
import * as PropTypes from 'prop-types';
import { containsNoCharacters } from '../utils/containsNoCharacters';
import { IAction } from '../actions/IAction';
import { alertTypes } from '../constants/alert/alertTypes';
import { alertMessages } from '../constants/alert/alertMessages';
import {assertAlert} from '../utils/assertAlert';

export interface IAddNewItemStateProps {
  newItemText: string;
}

export interface IAddNewItemDispatchProps {
  onAdd: (value: string) => Promise<IAction>;
  onNewTextChange: Function;
}

type IAddNewItemProps = IAddNewItemStateProps & IAddNewItemDispatchProps;

export class AddNewItem extends React.PureComponent<IAddNewItemProps> {

  static displayName = 'AddNewItem';

  static propTypes = {
    newItemText: PropTypes.string.isRequired,
    onAdd: PropTypes.func.isRequired,
    onNewTextChange: PropTypes.func.isRequired,
  };

  _onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newText = e.target.value;
    const {onNewTextChange} = this.props;
    onNewTextChange(newText);
  };

  _onClick = () => {
    const input = this.props.newItemText;
    this.props.onAdd(input)
      .then(() => assertAlert(alertTypes.SUCCESS, alertMessages.UPLOAD_SUCCESS))
      .catch(() => assertAlert(alertTypes.ERROR, alertMessages.UPLOAD_ERROR));
  };

  render() {
    const input = this.props.newItemText;
    const isEmpty = containsNoCharacters(input);

    return (
      <div className="content__row">
        <input
          className="input"
          type="text"
          onChange={this._onChange}
          value={input}
          placeholder="Type new item name..."
        />
        <button
          data-balloon={isEmpty ? 'Item name mustn\'t be empty' : null}
          data-balloon-pos="up"
          className="default_button"
          disabled={isEmpty}
          onClick={this._onClick}
        >
          Add
        </button>
      </div>
    );
  }
}
