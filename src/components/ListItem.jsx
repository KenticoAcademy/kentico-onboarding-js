import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { OpenedListItem } from './ListItemForm';
import { ClosedListItem } from './ClosedListItem';

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
    onClick: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      selectionRangeStarts: 0,
      selectionRangeEnds: 0,
    };
  }

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
    const {
      item: { id },
      onClick,
    } = this.props;

    onClick(id);

    this.setState({
      selectionRangeStarts,
      selectionRangeEnds,
    });
  };

  render() {
    const {
      number,
      item,
      item: {
        isBeingEdited,
      },
    } = this.props;

    const {
      selectionRangeStarts,
      selectionRangeEnds,
    } = this.state;

    return isBeingEdited ?
      <OpenedListItem
        item={item}
        number={number}
        selectionRangeStarts={selectionRangeStarts}
        selectionRangeEnds={selectionRangeEnds}
        onSave={this.changeItemText}
        onCancel={this.cancelUnsavedChanges}
        onDelete={this.deleteItem}
      /> :
      <ClosedListItem
        item={item}
        number={number}
        onClick={this.openItemForEditing}
      />;
  }
}
