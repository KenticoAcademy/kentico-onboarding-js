import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ListItemForm } from './ListItemForm';
import { ListItemStatic } from './ListItemStatic';

export class ListItem extends PureComponent {
  static displayName = 'ListItem';

  static propTypes = {
    item: PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      isBeingEdited: PropTypes.bool.isRequired,
      selectionRangeStarts: PropTypes.number.isRequired,
      selectionRangeEnds: PropTypes.number.isRequired,
    }),
    number: PropTypes.number.isRequired,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onTextSelected: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  changeItemText = (text) => {
    const { item: { id }, onSave } = this.props;

    onSave(id, text);
  };

  deleteItem = () => {
    const { item: { id }, onDelete } = this.props;

    onDelete(id);
  };

  cancelUnsavedChanges = () => {
    const { item: { id }, onCancel } = this.props;

    onCancel(id);
  };

  openItemForEditing = (selectionRangeStarts, selectionRangeEnds) => {
    const { item: { id }, onTextSelected } = this.props;

    onTextSelected(id, selectionRangeStarts, selectionRangeEnds);
  };

  render() {
    const {
      number,
      item,
    } = this.props;

    return item.isBeingEdited ?
      <ListItemForm
        item={item}
        number={number}
        onSave={this.changeItemText}
        onCancel={this.cancelUnsavedChanges}
        onDelete={this.deleteItem}
      /> :
      <ListItemStatic
        item={item}
        number={number}
        onTextSelection={this.openItemForEditing}
      />;
  }
}
