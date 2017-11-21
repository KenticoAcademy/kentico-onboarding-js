import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ListItemEditMode } from './ListItemEditMode';
import { textIsEmpty } from '../utils/validation.js';

class ListItem extends PureComponent {
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
    this.setState({ isBeingEdited: true });
  };

  render() {
    const { isBeingEdited } = this.state;
    const { number } = this.props;
    const { text } = this.props.item;

    if (isBeingEdited) {
      return (
        <ListItemEditMode
          text={text}
          number={number}
          onSave={this.onSave}
          onCancel={this.onCancel}
          onDelete={this.onDelete}
        />
      );
    }

    const textContent = number + '. ' + text;

    return (
      <div onClick={this.onItemClick}>
        {textContent}
      </div>
    );
  }
}

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  number: PropTypes.number.isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export { ListItem };
