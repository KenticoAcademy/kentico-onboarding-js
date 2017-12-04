import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { OpenedListItem } from './OpenedListItem';
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

  onSave = (text) => {
    const { item: { id }, onSave } = this.props;

    onSave(id, text);
  };

  onDelete = () => {
    const { item: { id }, onDelete } = this.props;

    onDelete(id);
  };

  onCancel = () => {
    const { item: { id }, onCancel } = this.props;

    onCancel(id);
  };

  onItemClick = (selectionRangeStarts, selectionRangeEnds) => {
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
        onSave={this.onSave}
        onCancel={this.onCancel}
        onDelete={this.onDelete}
      /> :
      <ClosedListItem
        item={item}
        number={number}
        onItemClick={this.onItemClick}
      />;
  }
}
