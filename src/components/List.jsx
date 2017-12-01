import React, { PureComponent } from 'react';
import { OrderedMap } from 'immutable';
import { HotKeys } from 'react-hotkeys';
import { keyMap } from '../constants/keys';
import { ListItem as ListItemModel } from '../models/ListItem';
import { ListItem } from './ListItem.jsx';
import { NewItemForm } from './NewItemForm';
import { createNewId } from '../utils/createNewId';

export class List extends PureComponent {
  static displayName = 'List';

  constructor(props) {
    super(props);

    this.state = {
      items: OrderedMap(),
    };
  }

  onDelete = (itemId) => {
    this.setState(prevState => ({
      items: prevState.items.delete(itemId),
    }));
  };

  addNewItem = (text) => {
    const id = createNewId();
    const item = new ListItemModel({
      id,
      text,
    });

    this.setState(prevState => ({
      items: prevState.items.set(id, item),
    }));
  };

  changeItemText = (changedItemId, newText) => {
    this.setState(prevState => ({
      items: prevState.items.update(changedItemId, item =>
        item.merge({
          text: newText,
        })),
    }));
  };

  render() {
    const { items } = this.state;
    const listItems = items
      .entrySeq()
      .map(([id, item], index) => (
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
      ));

    return (
      <HotKeys keyMap={keyMap}>
        <ol className="list-group">
          {listItems}

          <li className="list-group-item">
            <NewItemForm onAdd={this.addNewItem} />
          </li>
        </ol>
      </HotKeys>
    );
  }
}
