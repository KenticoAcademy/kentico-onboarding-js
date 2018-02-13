// components/ListItemEditor.jsx

import React from 'react';
import PropTypes from 'prop-types';

export class ListItemEditor extends React.PureComponent {
  static displayName = 'ListItemEditor';

  static propTypes = {
    itemValue: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      itemValue: props.itemValue,
    };
  }

  handleInputChange = (event) => this.setState({ itemValue: event.target.value });

  handleInputKeyUp = (event) => {
    if (event.key === 'Enter') {
      this.updateItem();
    }
    else if (event.key === 'Escape') {
      this.props.onCancel();
    }
  };

  updateItem = () => {
    const { itemValue } = this.state;

    if (itemValue) {
      this.props.onUpdate(itemValue);
    }
  };

  render() {
    const { onCancel, onDelete } = this.props;
    const { itemValue } = this.state;

    return (
      <span className="input-group">
        <input
          type="text"
          className="form-control"
          value={itemValue}
          onChange={this.handleInputChange}
          onKeyUp={this.handleInputKeyUp}
          autoFocus
        />
        <span className="input-group-btn">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.updateItem}
            disabled={!itemValue}
          > Save
          </button>
          <button
            type="button"
            className="btn btn-default"
            onClick={onCancel}
          > Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={onDelete}
          > Delete
          </button>
        </span>
      </span>
    );
  }
}
