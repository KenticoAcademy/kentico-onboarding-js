// components/List.jsx

import React from 'react';
import { OrderedMap } from 'immutable';

import { getUUIDv4 } from '../utils/uuidService';

import { NewItem } from './NewItem';
import { ListItem } from './ListItem';
import { ToDoItem } from '../models/toDoItem';

export class List extends React.PureComponent {
  static displayName = 'List';

  state = {
    items: OrderedMap(),
  };

  _addItem = (itemValue) => {
    const key = getUUIDv4();
    const toDoItem = new ToDoItem({
      key,
      value: itemValue,
    });

    this.setState(prevState => {
      return {
        items: prevState.items.set(key, toDoItem),
      };
    });
  };

  _saveItem = (item, updatedValue) => {
    const newItem = new ToDoItem({
      key: item.key,
      value: updatedValue,
    });
    const newItems = this.state.items.update(item.key, () => newItem);

    this.setState({ items: newItems });
  };

  _deleteItem = (item) => this.setState({ items: this.state.items.delete(item.key) });

  render() {
    const list = this.state.items.valueSeq()
      .map((item, index) => (
        <div className="list-group-item" key={item.key}>
          <ListItem
            item={item.set('bullet', index + 1)}
            onSave={this._saveItem}
            onDelete={this._deleteItem}
          />
        </div>
      ));

    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8">
          <div className="list-group">
            {list}
          </div>
          <NewItem onCreate={this._addItem} />
        </div>
      </div>
    );
  }
}
