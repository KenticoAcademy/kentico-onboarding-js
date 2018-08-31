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

    const dog = new ItemRecord({ id: uuidGenerator(), text: 'Dog' });
    const cat = new ItemRecord({ id: uuidGenerator(), text: 'Cat' });
    const elephant = new ItemRecord({ id: uuidGenerator(), text: 'Elephant' });

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
        .set(id, new ItemRecord({ 'id': id, text: newText }))
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
            items={this.state.items.valueSeq()}
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
