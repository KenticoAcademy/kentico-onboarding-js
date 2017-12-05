import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { checkEmptiness } from '../utils/checkEmptiness';

export class EditedListItem extends PureComponent {

  static displayName = 'EditedListItem';

  static propTypes = {
    itemId: PropTypes.string.isRequired,
    itemText: PropTypes.string.isRequired,
    updateItemText: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    toggleEditing: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      updatedValue: this.props.text,
    };
  }

  onTextChanged = (e) => {
    this.setState(
      { updatedValue: e.target.value }
    );
  };

  onSaveClick = () => {
    const { updateItemText } = this.props;
    updateItemText(this.props.itemId, this.state.updatedValue);
  };

  onDeleteClick = () => {
    const { deleteItem } = this.props;
    deleteItem(this.props.itemId);
  };

  onCancelClick = () => {
    const { toggleEditing } = this.props;
    toggleEditing(this.props.itemId);
  };

  render() {
    const { itemText } = this.props;
    const isEmpty = checkEmptiness(this.state.updatedValue);

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
            onClick={this.onSaveClick}
          >
            Save
          </button>
          <button
            className="btn btn-default"
            onClick={this.onCancelClick}
          >
            Cancel
          </button>
          <button
            className="btn btn-danger"
            onClick={this.onDeleteClick}
          >
            Delete
          </button>
        </div>
      </div>);
  }
}
