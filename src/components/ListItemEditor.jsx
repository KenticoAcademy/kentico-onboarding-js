// components/ListItemEditor.jsx

import React from 'react';
import PropTypes from 'prop-types';

export class ListItemEditor extends React.PureComponent {
  static displayName = 'ListItemEditor';

  static propTypes = {
    itemKey: PropTypes.string.isRequired,
    itemValue: PropTypes.string.isRequired,
    isInputValid: PropTypes.bool.isRequired,
    bullet: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,

    saveItem: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    cancelItemEditing: PropTypes.func.isRequired,
    handleItemValueChange: PropTypes.func.isRequired,
    handleKeyboardShortcuts: PropTypes.func.isRequired,
  };

  _handleInputChange = (event) => this.props.handleItemValueChange(event.target.value);

  _handleInputKeyDown = (event) => this.props.handleKeyboardShortcuts(event.key, event.target.value);

  render() {
    const { cancelItemEditing, deleteItem, saveItem, bullet, itemValue, isInputValid } = this.props;

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
          onKeyDown={this._handleInputKeyDown}
          autoFocus
        />
        <span className="input-group-btn">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => saveItem(itemValue)}
            disabled={!isInputValid}
          > Save
          </button>
          <button
            type="button"
            className="btn btn-default"
            onClick={cancelItemEditing}
          > Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={deleteItem}
          > Delete
          </button>
        </span>
      </div>
    );
  }
}
