import React, { PureComponent } from 'react';
import { Item } from './Item';
import { AddItem } from './AddItem';

export class Board extends PureComponent {
  static displayName = 'Board';

  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          id: 1,
          text: 'Dog',
        },
        {
          id: 2,
          text: 'Cat',
        },
        {
          id: 3,
          text: 'Elephant',
        },
      ],
      idCnt: 4
    };
  }

  _addItem = (text) => {
    this.setState(prevState => ({
      items: [
        ...prevState.items,
        {
          'id': prevState.idCnt,
          'text': text
        },
      ],
      idCnt: prevState.idCnt + 1
    }));
  };

  _editItem = (pos, text) => {
    const updatedItems = [...this.state.items];
    updatedItems[pos - 1].text = text;
    this.setState(() => ({
      items: updatedItems
    }));
  };

  _delItem = (pos) => {
    const updatedItems = [...this.state.items];
    updatedItems.splice(pos - 1, 1);
    this.setState(() => ({
      items: updatedItems
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
              pos={index + 1}
              onSave={this._editItem}
              onDelete={this._delItem}
            />))}
          <li className="list-group-item">
            <AddItem onChange={this._addItem} />
          </li>
        </ul>
      </div>
    );
  }
}
