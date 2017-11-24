import React, { PureComponent } from 'react';
import { OrderedMap } from 'immutable';
import { ListItemRecord } from '../models/ListItemRecord';
import { ListItem } from './ListItem.jsx';
import { NewItemForm } from './NewItemForm';
import { createNewId } from '../utils/createNewId';

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
    const newItems = this.state.items.update(changedItemId, (item) => {
      return item.merge({ text: newText });
    });

    this.setState({ items: newItems });
  };

  render() {
    const listItems = this.state.items.entrySeq().map(([id, item], index) => {
      return (
        <li
          className="list-group-item"
          key={id}
        >
          <ListItem
            item={item}
            number={index + 1}
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
