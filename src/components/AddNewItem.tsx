import * as React from 'react';
import * as PropTypes from 'prop-types';
import { isNotText } from '../utils/isNotText';
import { ChangeEvent } from 'react';

export interface IAddNewItemDataProps {
  newItemText: string;
}

export interface IAddNewItemCallbackProps {
  onAdd: (value: string) => Function;
  onNewTextChange: (newText: string) => Function;
}

export class AddNewItem extends React.PureComponent<IAddNewItemDataProps & IAddNewItemCallbackProps> {

  static displayName = 'AddNewItem';

  static propTypes = {
    newItemText: PropTypes.string.isRequired,
    onAdd: PropTypes.func.isRequired,
    onNewTextChange: PropTypes.func.isRequired,
  };

  _onChange (e: ChangeEvent<HTMLInputElement>): void {
    const newText = e.target.value;
    this.props.onNewTextChange(newText);
  };

  _onClick = () => {
    const input = this.props.newItemText;
    this.props.onAdd(input);
  };

  render() {
    const input = this.props.newItemText;
    const isEmpty = isNotText(input);

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
