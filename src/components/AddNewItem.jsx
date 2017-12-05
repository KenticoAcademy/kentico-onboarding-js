import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { checkEmptiness } from '../utils/checkEmptiness';

export class AddNewItem extends PureComponent {

  static displayName = 'AddNewItem';

  static propTypes = {
    newItemText: PropTypes.string.isRequired,
    onAdd: PropTypes.func.isRequired,
    onNewTextChange: PropTypes.func.isRequired,
  };

  onChange = (e) => {
    const newText = e.target.value;
    this.props.onNewTextChange(newText);
  };

  onClick = () => {
    const input = this.props.newItemText;
    this.props.onAdd(input);
  };

  render() {
    const input = this.props.newItemText;
    const isEmpty = checkEmptiness(input);

    return (
      <div className="list-group-item form-inline">
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            onChange={this.onChange}
            value={input}
            placeholder="Type new item name..."
          />
          <div className="input-group-btn">
            <button
              data-balloon={isEmpty ? "Item name mustn't be empty" : null}
              data-balloon-pos="up"
              className="btn btn-default"
              disabled={isEmpty}
              onClick={this.onClick}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    );
  }
}
