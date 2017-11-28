import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ListItemEditMode } from './ListItemEditMode';

export class ListItem extends PureComponent {
  static propTypes = {
    item: PropTypes.object.isRequired,
    number: PropTypes.number.isRequired,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      isBeingEdited: false,
    };
  }

  onSave = (text) => {
    const { item, onSave } = this.props;
    const { id } = item;

    onSave(id, text);

    this.setState({
      isBeingEdited: false,
    });
  };

  onCancel = () => this.setState({
    isBeingEdited: false,
  });

  onDelete = () => {
    const { item, onDelete } = this.props;
    const { id } = item;

    onDelete(id);
  };

  onItemClick = () => {
    const selection = window
      .getSelection()
      .getRangeAt(0);

    const { startOffset, endOffset } = selection;

    this.setState({
      isBeingEdited: true,
      selectionRangeStarts: startOffset,
      selectionRangeEnds: endOffset,
    });
  };

  render() {
    const { number, item } = this.props;
    const { text } = item;

    const {
      isBeingEdited,
      selectionRangeStarts,
      selectionRangeEnds,
    } = this.state;

    if (isBeingEdited) {
      return (
        <ListItemEditMode
          text={text}
          number={number}
          selectionRangeStarts={selectionRangeStarts}
          selectionRangeEnds={selectionRangeEnds}
          onSave={this.onSave}
          onCancel={this.onCancel}
          onDelete={this.onDelete}
        />
      );
    }

    return (
      <div onMouseUp={this.onItemClick}>
        {number + '. '}
        {text}
      </div>
    );
  }
}
