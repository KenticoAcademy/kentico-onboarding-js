import React, { PureComponent } from 'react';
import { uuidGenerator } from '../utils/uuidGenerator';
import { AddItem } from './AddItem';
import { List } from './List';

export class Board extends PureComponent {
  static displayName = 'Board';

  state = {
    items: [
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
    ],
  };

  _addItem = (newText) => {
    this.setState(prevState => ({
      items: [
        ...prevState.items,
        {
          id: uuidGenerator(),
          text: newText
        },
      ],
    }));
  };

  _editItem = (id, text) => {
    this.setState((prevState) => ({
      items: prevState.items
        .map(item => {
          if (item.id === id) {
            return Object.assign({}, item, { text });
          }
          return item;
        })
    }));
  };

  _deleteItem = (id) => {
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
