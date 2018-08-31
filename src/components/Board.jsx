import React, { PureComponent } from 'react';
import { generateId } from '../utils/generateId';
import { ItemRecord } from '../models/ItemRecord';
import { getIInitialItems } from '../utils/getIInitialItems';
import { AddItem } from './AddItem';
import { List } from './List';

export class Board extends PureComponent {
  static displayName = 'Board';

  state = {
    items: getIInitialItems()
  };

  _addItem = newText => {
    const id = generateId();
    this.setState(prevState => ({
      items: prevState.items
        .set(id, new ItemRecord({
          'id': id,
          text: newText
        }))
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
