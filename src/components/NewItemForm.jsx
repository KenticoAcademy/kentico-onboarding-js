import React from 'react';
import propTypes from 'prop-types';
import { checkEmptiness } from '../utils/checkEmptiness';

export class NewItemForm extends React.Component {
  static propTypes = {
    onAddItem: propTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      newItemText: '',
    };
  }

  onAddNewItem = () => {
    this.props.onAddItem(this.state.newItemText);
    this.setState({ newItemText: '' });
  }

  newItemTextChange = (e) => {
    this.setState({ newItemText: e.target.value });
  };

  render() {
    return (
      <div className="list-group-item form-inline">
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            value={this.state.newItemText}
            onChange={this.newItemTextChange}
            placeholder="Type new item name..."
          />
          <div className="input-group-btn">
            <button
              data-balloon={checkEmptiness(this.state.newItemText) ? "Item name mustn't be empty" : null}
              data-balloon-pos="up"
              className="btn btn-default"
              disabled={checkEmptiness(this.state.newItemText)}
              onClick={this.onAddNewItem}
            >
              Add
            </button>
          </div>
        </div>
      </div>);
  }
}

