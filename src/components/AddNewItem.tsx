import * as React from 'react';
import * as PropTypes from 'prop-types';
import { containsNoCharacters } from '../utils/containsNoCharacters';
import { IAction } from '../actions/IAction';

export interface IAddNewItemDataProps {
  newItemText: string;
}

export interface IAddNewItemCallbackProps {
  onAdd: (value: string) => Promise<IAction>;
  onNewTextChange: Function;
}

export interface IAddNewItemProps extends IAddNewItemDataProps, IAddNewItemCallbackProps {
}

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
    this.props.onAdd(input);
  };

  render() {
    const input = this.props.newItemText;
    const isEmpty = containsNoCharacters(input);

    return (
      <div className="list-group-item form-inline">
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            onChange={this._onChange}
            value={input}
            placeholder="Type new item name..."
          />
          <div className="input-group-btn">
            <button
              data-balloon={isEmpty ? 'Item name mustn\'t be empty' : null}
              data-balloon-pos="up"
              className="btn btn-default"
              disabled={isEmpty}
              onClick={this._onClick}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    );
  }
}
