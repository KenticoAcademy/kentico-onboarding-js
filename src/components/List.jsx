// components/List.jsx

import React from 'react';

import { OrderedMap } from 'immutable';

import { getIdentifier } from '../utils/uuidService';

import { NewItem } from './NewItem';
import { ListItem } from './ListItem';
import { Item } from '../models/item';
import { ToDo } from '../models/toDo';

export class List extends React.PureComponent {
  static displayName = 'List';

  state = {
    items: OrderedMap(),
  };

  _addItem = (itemValue) => {
    const key = getIdentifier();
    const item = new Item({
      todo: new ToDo({
        key,
        value: itemValue,
      }),
    });

    this.setState(prevState => ({ items: prevState.items.set(key, item) }));
  };

  _saveItem = (item, updatedValue) => this.setState(prevState => ({
    items: prevState.items.mergeIn([item.todo.key], {
      todo: item.todo.merge({ value: updatedValue }),
    }),
  }));

  _deleteItem = (item) => this.setState(prevState => ({ items: prevState.items.delete(item.todo.key) }));

  render() {
    const list = this.state.items.valueSeq()
      .map((item, index) => (
        <div className="list-group-item" key={item.todo.key}>
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
