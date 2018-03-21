// components/ListItemEditor.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { Shortcuts } from 'react-shortcuts';

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
    onCancelEdit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  _handleChange = (event) => this.props.onChange(event.target.value);

  _handleShortcuts = (action) => {
    const {
      item: {
        temporaryValue,
      },
      saveItem,
      deleteItem,
      onCancelEdit,
    } = this.props;

    switch (action) {
      case 'ITEM_EDIT_CONFIRM':
        if (isInputValid(temporaryValue)) {
          saveItem(temporaryValue);
        }
        break;
      case 'ITEM_EDIT_CANCEL':
        onCancelEdit();
        break;
      case 'ITEM_DELETE':
        deleteItem();
        break;
      default:
        break;
    }
  };

  render() {
    const {
      item: {
        bullet,
        temporaryValue,
      },
      onCancelEdit,
      deleteItem,
      saveItem,
    } = this.props;

    return (
      <Shortcuts name="NewItem" handler={this._handleShortcuts}>
        <div className="input-group">
          <span className="input-group-addon">
            {bullet}
          </span>
          <input
            type="text"
            className="form-control"
            value={temporaryValue}
            onChange={this._handleChange}
            autoFocus
          />
          <span className="input-group-btn">
            <button
              type="button"
              className="btn btn-primary"
              onClick={saveItem}
              disabled={!isInputValid(temporaryValue)}
            >
              Save
            </button>
            <button
              type="button"
              className="btn btn-default"
              onClick={onCancelEdit}
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
      </Shortcuts>
    );
  }
}
