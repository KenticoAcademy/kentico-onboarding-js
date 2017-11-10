import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { PlainItem } from './PlainItem';
import { EditedItem } from './EditedItem';
import ImmutablePropTypes from 'react-immutable-proptypes';

export class Item extends PureComponent {
  static propTypes = {
    onDeleteItem: PropTypes.func.isRequired,
    onSaveItem: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onTextClick: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    item: ImmutablePropTypes.contains({
      id: PropTypes.string.isRequired,
      isEdited: PropTypes.bool.isRequired,
    }).isRequired,
  };

  deleteItem = () => {
    this.props.onDeleteItem(
      this.props.item.id
    );
  };

  saveItem = (savedText) => {
    this.props.onSaveItem(
      this.props.item.id,
      savedText,
    );
  };

  cancelChange = () => {
    this.props.onCancel(
      this.props.item.id
    );
  };

  clickedOnText = () => {
    this.props.onTextClick(
      this.props.item.id
    );
  };

  render() {
    return (
      <li className="list-group-item">
        {(this.props.item.isEdited) ?
          <EditedItem
            item={this.props.item}
            index={this.props.index}
            onSaveItem={this.saveItem}
            onDelete={this.deleteItem}
            onCancel={this.cancelChange}
            onChange={this.changeOfInput}
          /> :
          <PlainItem
            index={this.props.index}
            item={this.props.item}
            onClick={this.clickedOnText}
          />
        }
      </li>
    );
  }
}
