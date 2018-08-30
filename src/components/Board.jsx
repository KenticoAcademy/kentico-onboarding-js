import React, { PureComponent } from 'react';
import {
  OrderedMap,
} from 'immutable';
import { uuidGenerator } from '../utils/uuidGenerator';
import { ItemRecord } from '../models/ItemRecord';
import { AddItem } from './AddItem';
import { List } from './List';

export class Board extends PureComponent {
  static displayName = 'Board';

  constructor() {
    super();

    const dog = new ItemRecord(uuidGenerator(), 'Dog');
    const cat = new ItemRecord(uuidGenerator(), 'Cat');
    const elephant = new ItemRecord(uuidGenerator(), 'Elephant');

    this.state = {
      items: new OrderedMap({
        [dog.id]: dog,
        [cat.id]: cat,
        [elephant.id]: elephant,
      }),
    };
  }

  _addItem = newText => {
    const id = uuidGenerator();
    this.setState(prevState => ({
      items: prevState.items
        .set(id, new ItemRecord(id, newText))
    }));
  };

  _editItem = (id, text) => {
    this.setState((prevState) => ({
      items: prevState.items
        .setIn([id, 'text'], text)
    }));
  };

  _deleteItem = id => {
    this.setState((prevState) => ({
      items: prevState.items
        .filter(item => item.id !== id)
    }));
  };

  render() {
    return (
      <div>
        <ul className="list-group">
          <List
            items={this.state.items}
            onSave={this._editItem}
            onDelete={this._deleteItem}
          />
          <li className="list-group-item">
            <AddItem onChange={this._addItem} />
          </li>
        </ul>
      </div>
    );
  }
}
