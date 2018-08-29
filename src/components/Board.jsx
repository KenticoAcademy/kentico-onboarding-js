import React, { PureComponent } from 'react';
import {
  OrderedMap,
  Record
} from 'immutable';
import { uuidGenerator } from '../utils/uuidGenerator';
import { AddItem } from './AddItem';
import { List } from './List';

export class Board extends PureComponent {
  static displayName = 'Board';

  constructor() {
    super();

    this.ItemRecord = new Record({
      id: 0,
      text: '',
    });

    this._createItemRecord = (id, text) => (
      new this.ItemRecord({
        'id': id,
        'text': text,
      }));

    const items = [
      {
        id: uuidGenerator(),
        text: 'Dog',
      },
      {
        id: uuidGenerator(),
        text: 'Cat',
      },
      {
        id: uuidGenerator(),
        text: 'Elephant',
      },
    ];

    this.state = {
      items: new OrderedMap(),
    };

    items.forEach(element => {
      const id = uuidGenerator();
      this.state.items = this.state.items
        .set(id, this._createItemRecord(id, element.text));
    });
  }

  _addItem = newText => {
    const id = uuidGenerator();
    this.setState(prevState => ({
      items: prevState.items
        .set(id, this._createItemRecord(id, newText))
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
