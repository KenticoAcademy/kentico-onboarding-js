// components/ListItemEditor.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { isInputValid } from '../utils/validationService';

export class ListItemEditor extends React.PureComponent {
  static displayName = 'ListItemEditor';

  static propTypes = {
    itemKey: PropTypes.string.isRequired,
    itemValue: PropTypes.string.isRequired,
    bullet: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,

    saveItem: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    cancelItemEditing: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  _handleInputChange = (event) => this.props.onChange(event.target.value);

  _handleInputKeyDown = (event) => {
    const { itemValue, itemKey, saveItem, cancelItemEditing } = this.props;

    if (event.key === 'Enter' && isInputValid(itemValue)) {
      saveItem(itemKey, itemValue);
    }
    else if (event.key === 'Escape') {
      cancelItemEditing(itemKey);
    }
  };

  _saveItem = () => this.props.saveItem(this.props.itemValue);

  render() {
    const { cancelItemEditing, deleteItem, bullet, itemValue } = this.props;

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
            onClick={this._saveItem}
            disabled={!isInputValid(itemValue)}
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
