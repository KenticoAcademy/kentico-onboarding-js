import React from 'react';
import propTypes from 'prop-types';
import { DisabledButton } from './DisabledButton';

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
          />
          <div className="input-group-btn">
            {this.state.newItemText === '' ?
              <DisabledButton
                buttonLabel="Add"
                buttonType="btn btn-default"
              /> : <button
                className="btn btn-default"
                onClick={this.onAddNewItem}
              >
                Add
              </button>
            }
          </div>
        </div>
      </div>);
  }
}

