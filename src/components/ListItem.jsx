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
    }),
    number: PropTypes.number.isRequired,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onItemOpened: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      selectionRangeStarts: 0,
      selectionRangeEnds: 0,
    };
  }

  saveItemChanges = (text) => {
    const { item: { id }, onSave } = this.props;

    onSave(id, text);
  };

  deleteItem = () => {
    const { item: { id }, onDelete } = this.props;

    onDelete(id);
  };

  cancelItemChanges = () => {
    const { item: { id }, onCancel } = this.props;

    onCancel(id);
  };

  openItemForEditing = (selectionRangeStarts, selectionRangeEnds) => {
    const { item: { id }, onItemOpened } = this.props;

    onItemOpened(id);

    this.setState({
      selectionRangeStarts,
      selectionRangeEnds,
    });
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
        selectionRangeStarts={this.state.selectionRangeStarts}
        selectionRangeEnds={this.state.selectionRangeEnds}
        onSave={this.saveItemChanges}
        onCancel={this.cancelItemChanges}
        onDelete={this.deleteItem}
      /> :
      <ListItemStatic
        item={item}
        number={number}
        onTextSelection={this.openItemForEditing}
      />;
  }
}
