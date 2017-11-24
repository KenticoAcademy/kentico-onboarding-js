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
    const { id } = this.props.item;

    this.setState({ isBeingEdited: false });
    this.props.onSave(id, text);
  };

  onCancel = () => {
    this.setState({ isBeingEdited: false });
  };

  onDelete = () => {
    const { id } = this.props.item;
    this.props.onDelete(id);
  };

  onItemClick = () => {
    const selection = window.getSelection().getRangeAt(0);
    const { startOffset, endOffset } = selection;

    this.setState({
      isBeingEdited: true,
      startOffset,
      endOffset,
    });
  };

  render() {
    const { isBeingEdited, startOffset, endOffset } = this.state;
    const { number } = this.props;
    const { text } = this.props.item;

    if (isBeingEdited) {
      return (
        <ListItemEditMode
          text={text}
          number={number}
          startOffset={startOffset}
          endOffset={endOffset}
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
