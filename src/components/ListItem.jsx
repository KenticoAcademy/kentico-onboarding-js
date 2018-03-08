// components/ListItem.jsx

import React from 'react';
import PropTypes from 'prop-types';

import { ListItemEditor } from '../containers/ListItemEditor';
import { ListItemDisplay } from '../containers/ListItemDisplay';
import { ToDoItem } from '../models/toDoItem';

export class ListItem extends React.PureComponent {
  static displayName = 'ListItem';

  static propTypes = {
    item: PropTypes.instanceOf(ToDoItem).isRequired,
    bullet: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    onDelete: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
  };
  _deleteItem = () => {
    const { onDelete, item } = this.props;
    onDelete(item);
  };

  _updateItem = (updatedItemValue) => {
    const { item, onSave } = this.props;
    onSave(item, updatedItemValue);
  };

  render() {
    const { item, bullet } = this.props;

    let listItem = (
      <ListItemDisplay
        item={item}
        bullet={bullet}
      />
    );

    if (item.isBeingEdited) {
      listItem = (
        <ListItemEditor
          item={item}
          bullet={bullet}
          onDelete={this._deleteItem}
          onUpdate={this._updateItem}
        />
      );
    }

    return (
      <div>
        {listItem}
      </div>
    );
  }
}
