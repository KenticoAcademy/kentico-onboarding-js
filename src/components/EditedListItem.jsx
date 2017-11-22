import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { checkEmptiness } from '../utils/checkEmptiness';
import {
  deleteItem,
  toggleEditing,
  updateItemText,
} from '../utils/actionCreators';

export class EditedListItem extends PureComponent {

  static propTypes = {
    item: PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      isBeingEdited: PropTypes.bool.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      updatedValue: this.props.item.value,
    };
  }

  onTextChanged = (e) => {
    this.setState(
      { updatedValue: e.target.value }
    );
  };

  toggleTextEditing = () => {
    const { item, onToggleEditing } = this.props;
    onToggleEditing(item.id);
  };

  deleteItem = () => {
    const { item, onItemDeletion } = this.props;
    onItemDeletion(item.id);
  };

  saveNewText = () => {
    const { item, onItemSaved } = this.props;
    onItemSaved(item.id, this.state.updatedValue);
  };

  render() {
    const { value } = this.props.item;
    const isEmpty = checkEmptiness(this.state.updatedValue);
    const { store } = this.context;

    return (
      <div className="input-group">
        <input
          className="form-control"
          defaultValue={value}
          onChange={this.onTextChanged}
          placeholder="Type new item name..."
        />
        <div className="input-group-btn">
          <button
            data-balloon={isEmpty ? "Item name mustn't be empty" : null}
            data-balloon-pos="up"
            className="btn btn-primary"
            disabled={isEmpty}
            onClick={() => store.dispatch(updateItemText(this.props.item.id, value))}
          >
            Save
          </button>
          <button
            className="btn btn-default"
            onClick={() => store.dispatch(toggleEditing(this.props.item.id, true))}
          >
            Cancel
          </button>
          <button
            className="btn btn-danger"
            onClick={() => store.dispatch(deleteItem(this.props.item.id, value))}
          >
            Delete
          </button>
        </div>
      </div>);
  }
}
