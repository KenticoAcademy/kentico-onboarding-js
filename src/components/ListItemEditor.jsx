// components/ListItemEditor.jsx

import React from 'react';
import PropTypes from 'prop-types';

import { isInputValid } from '../utils/validationService';
import { ToDoItem } from '../models/toDoItem';

export class ListItemEditor extends React.PureComponent {
  static displayName = 'ListItemEditor';

  static propTypes = {
    item: PropTypes.instanceOf(ToDoItem).isRequired,
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  _handleInputChange = (event) => this.setState({ itemValue: event.target.value });

  _handleInputKeyUp = (event) => {
    if (event.key === 'Enter' && isInputValid(this.state.itemValue)) {
      this._saveItem();
    }
    else if (event.key === 'Escape') {
      this.props.onCancel();
    }
  };

  _saveItem = () => this.props.onSave(this.props.itemValue);

  render() {
    const { onCancel, onDelete, bullet, itemValue } = this.props;

    return (
      <div className="input-group">
        <span className="input-group-addon">
          {bullet}
        </span>
        <input
          type="text"
          className="form-control"
          value={itemValue}
          onChange={this._handleInputChange}
          onKeyUp={this._handleInputKeyUp}
          autoFocus
        />
        <span className="input-group-btn">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this._saveItem}
            disabled={!isInputValid(itemValue)}
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
      </div>
    );
  }
}
