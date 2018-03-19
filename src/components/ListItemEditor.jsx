// components/ListItemEditor.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { isInputValid } from '../utils/validationService';

export class ListItemEditor extends React.PureComponent {
  static displayName = 'ListItemEditor';

  static propTypes = {
    item: PropTypes.shape({
      bullet: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
      temporaryValue: PropTypes.string,
    }).isRequired,

    saveItem: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    cancelItemEditing: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  _handleChange = (event) => this.props.onChange(event.target.value);

  _handleKeyDown = (event) => {
    const {
      item: {
        temporaryValue,
      },
      saveItem,
      cancelItemEditing,
    } = this.props;

    if (event.key === 'Enter' && isInputValid(temporaryValue)) {
      saveItem(temporaryValue);
    }
    else if (event.key === 'Escape') {
      cancelItemEditing();
    }
  };

  _saveItem = () => this.props.saveItem(this.props.item.temporaryValue);

  render() {
    const {
      item: {
        bullet,
        temporaryValue,
      },
      cancelItemEditing,
      deleteItem,
    } = this.props;

    return (
      <div className="input-group">
        <span className="input-group-addon">
          {bullet}
        </span>
        <input
          type="text"
          className="form-control"
          value={temporaryValue}
          onChange={this._handleChange}
          onKeyDown={this._handleKeyDown}
          autoFocus
        />
        <span className="input-group-btn">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this._saveItem}
            disabled={!isInputValid(temporaryValue)}
          >
            Save
          </button>
          <button
            type="button"
            className="btn btn-default"
            onClick={cancelItemEditing}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={deleteItem}
          >
            Delete
          </button>
        </span>
      </div>
    );
  }
}
