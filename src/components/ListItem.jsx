import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ListItemForm } from './ListItemForm';
import { ListItemStatic } from './ListItemStatic';

export class ListItem extends PureComponent {
  static displayName = 'ListItem';

  static propTypes = {
    item: PropTypes.shape({
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
    const { onSave } = this.props;

    onSave(text);
  };

  openItemForEditing = (selectionRangeStarts, selectionRangeEnds) => {
    const { onItemOpened } = this.props;

    onItemOpened();

    this.setState({
      selectionRangeStarts,
      selectionRangeEnds,
    });
  };

  render() {
    const {
      number,
      item,
      onCancel,
      onDelete,
    } = this.props;

    return item.isBeingEdited ?
      <ListItemForm
        item={item}
        number={number}
        selectionRangeStarts={this.state.selectionRangeStarts}
        selectionRangeEnds={this.state.selectionRangeEnds}
        onSave={this.saveItemChanges}
        onCancel={onCancel}
        onDelete={onDelete}
      /> :
      <ListItemStatic
        item={item}
        number={number}
        onTextSelection={this.openItemForEditing}
      />;
  }
}
