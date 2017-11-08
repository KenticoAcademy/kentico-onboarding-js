import React from 'react';
import propTypes from 'prop-types';
import { DisabledButton } from './DisabledButton';

class NewItemForm extends React.Component {
  static propTypes = {
    newItemText: propTypes.string.isRequired,
    onTextChange: propTypes.func.isRequired,
    onAddItem: propTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      newItemText: '',
    };
  }

  newItemTextChange = (e) => {
    this.setState({ newItemText: e.target.value });
    this.props.onTextChange(this.state.newItemText);
  };

  render() {
    return (
      <div className="list-group-item form-inline">
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            value={this.props.newItemText}
            onChange={this.newItemTextChange}
          />
          <div className="input-group-btn">
            {this.props.newItemText === '' ?
              <DisabledButton
                buttonLabel="Add"
                buttonType="btn btn-default"
              /> : <button
                className="btn btn-default"
                onClick={this.props.onAddItem}
              >
                Add
              </button>
            }
          </div>
        </div>
      </div>);
  }
}

