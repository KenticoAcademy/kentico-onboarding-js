import React from 'react';
import PropTypes from 'prop-types';

export class AddNewItemComponent extends React.Component {

  static propTypes = {
    newItemText: PropTypes.string.isRequired,
    onTextChange: PropTypes.func.isRequired,
    onAddItem: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div className="list-group-item">
        <div className="form-inline">
          <input
            className="form-control"
            type="text"
            value={this.props.newItemText}
            onChange={this.props.onTextChange}
          />
          <button
            className="btn btn-default"
            title="Add"
            onClick={this.props.onAddItem}
          >Add
          </button>
        </div>
      </div>);
  }
}
