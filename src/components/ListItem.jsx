import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ListItemForm } from '../containers/ListItemForm';
import { ListItemStatic } from './ListItemStatic';

export class ListItem extends PureComponent {
  static displayName = 'ListItem';

  static propTypes = {
    number: PropTypes.number.isRequired,
    item: PropTypes.shape({
      isBeingEdited: PropTypes.bool.isRequired,
    }),
    onItemOpened: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      selectionRangeStarts: 0,
      selectionRangeEnds: 0,
    };
  }

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
    } = this.props;

    return item.isBeingEdited ?
      <ListItemForm
        item={item}
        number={number}
        selectionRangeStarts={this.state.selectionRangeStarts}
        selectionRangeEnds={this.state.selectionRangeEnds}
      /> :
      <ListItemStatic
        item={item}
        number={number}
        onTextSelection={this.openItemForEditing}
      />;
  }
}
