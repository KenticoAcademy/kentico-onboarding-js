import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { isNotText } from '../utils/isNotText';

export class EditedListItem extends PureComponent {

  static displayName = 'EditedListItem';

  static propTypes = {
    itemText: PropTypes.string.isRequired,
    textUpdate: PropTypes.string.isRequired,
    updateItemText: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    toggleEditing: PropTypes.func.isRequired,
    textUpdateChange: PropTypes.func.isRequired,
  };

  onTextChanged = (e) => {
    const { textUpdateChange } = this.props;
    textUpdateChange(e.target.value);
  };

  render() {
    const { itemText, toggleEditing, deleteItem, textUpdate, updateItemText } = this.props;
    const isEmpty = isNotText(textUpdate);

    return (
      <div className="input-group">
        <input
          className="form-control"
          defaultValue={itemText}
          onChange={this.onTextChanged}
          placeholder="Type new item name..."
        />
        <div className="input-group-btn">
          <button
            data-balloon={isEmpty ? "Item name mustn't be empty" : null}
            data-balloon-pos="up"
            className="btn btn-primary"
            disabled={isEmpty}
            onClick={updateItemText}
          >
            Save
          </button>
          <button
            className="btn btn-default"
            onClick={toggleEditing}
          >
            Cancel
          </button>
          <button
            className="btn btn-danger"
            onClick={deleteItem}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}
