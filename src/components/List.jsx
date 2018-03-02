// components/List.jsx

import React from 'react';

import { OrderedMap } from 'immutable';

import { getIdentifier } from '../utils/uuidService';

import { NewItem } from './NewItem';
import { ListItem } from './ListItem';
import { ToDoItem } from '../models/toDoItem';

export class List extends React.PureComponent {
  static displayName = 'List';

  state = {
    items: OrderedMap(),
  };

  _addItem = (itemValue) => {
    const key = getIdentifier();
    const toDoItem = new ToDoItem({
      key,
      value: itemValue,
    }, 'toDo');

    this.setState(prevState => ({ items: prevState.items.set(key, toDoItem) }));
  };

  _saveItem = (item, updatedValue) => {
    const newItem = item.merge({ value: updatedValue });
    const newItems = this.state.items.update(newItem.key, () => newItem);

    this.setState({ items: newItems });
  };

  _deleteItem = (item) => this.setState(prevState => ({ items: prevState.items.delete(item.key) }));

  render() {
    const list = this.state.items.valueSeq()
      .map((item, index) => (
        <div className="list-group-item" key={item.key}>
          <ListItem
            item={item}
            bullet={index + 1}
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
