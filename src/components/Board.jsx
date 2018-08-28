import React, { PureComponent } from 'react';
import { uuidGen } from './UuidGen';
import { Item } from './Item';
import { AddItem } from './AddItem';

export class Board extends PureComponent {
  static displayName = 'Board';

  state = {
    items: [
      {
        id: uuidGen(),
        text: 'Dog',
      },
      {
        id: uuidGen(),
        text: 'Cat',
      },
      {
        id: uuidGen(),
        text: 'Elephant',
      },
    ],
  };

  _addItem = (text) => {
    this.setState(prevState => ({
      items: [
        ...prevState.items,
        {
          'id': uuidGen(),
          'text': text
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
          {this.state.items
            .map((item, index) => (
            <Item
              key={item.id}
              id={item.id}
              text={item.text}
              position={index + 1}
              onSave={this._editItem}
              onDelete={this._deleteItem}
            />))}
          <li className="list-group-item">
            <AddItem onChange={this._addItem} />
          </li>
        </ul>
      </div>
    );
  }
}
