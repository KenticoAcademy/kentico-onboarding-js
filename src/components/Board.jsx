import React, { PureComponent } from 'react';
import { uuidGen } from './UuidGen';
import { Item } from './Item';
import { AddItem } from './AddItem';

export class Board extends PureComponent {
  static displayName = 'Board';

  constructor(props) {
    super(props);
    this.state = {
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
  }

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
    const updatedItems = [...this.state.items];
    const pos = updatedItems.findIndex(item => item.id === id);
    updatedItems[pos].text = text;
    this.setState(() => ({
      items: updatedItems
    }));
  };

  _deleteItem = (id) => {
    this.setState((prevState) => ({
      items: prevState.items.filter(item => item.id !== id)
    }));
  };

  render() {
    return (
      <div>
        <ul className="list-group">
          {this.state.items.map((item, index) => (
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
