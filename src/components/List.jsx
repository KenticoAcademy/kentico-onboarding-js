import React, { PureComponent } from 'react';
import { Record, OrderedMap } from 'immutable';
import { ListItem } from './ListItem.jsx';
import { NewItemForm } from './NewItemForm';
import { createNewId } from '../utils/createNewId';

const ListItemRecord = Record({ id: '', text: '' });

export class List extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      items: OrderedMap(),
    };
  }

  onDelete = (itemId) => {
    const newItems = this.state.items.delete(itemId);
    this.setState({ items: newItems });
  };

  addNewItem = (text) => {
    const id = createNewId();
    const item = new ListItemRecord({ id, text });
    const newItems = this.state.items.set(id, item);

    this.setState({ items: newItems });
  };

  changeItemText = (changedItemId, newText) => {
    const newItems = this.state.items.map((item, id) => {
      if (id === changedItemId) {
        return item.set('text', newText);
      }
      return item;
    });

    this.setState({ items: newItems });
  };

  render() {
    let counter = 0;

    const listItems = this.state.items.map((item, id) => {
      counter++;

      return (
        <li
          className="list-group-item"
          key={id}
        >
          <ListItem
            item={item}
            number={counter}
            onSave={this.changeItemText}
            onDelete={this.onDelete}
          />
        </li>
      );
    });

    return (
      <ol className="list-group">
        {listItems}

        <li className="list-group-item">
          <NewItemForm onAdd={this.addNewItem} />
        </li>
      </ol>
    );
  }
}
