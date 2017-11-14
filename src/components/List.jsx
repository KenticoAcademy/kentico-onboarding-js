import React, { PureComponent } from 'react';
import { ListItem } from './ListItem.jsx';
import { NewItemForm } from './NewItemForm';
import { createNewId } from '../utils/generateId';
import { inputIsNotEmpty } from '../utils/validation';

export class List extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
    };
  }

  onDelete = (itemId) => {
    const newItems = this.state.items.filter(item => item.id !== itemId);
    this.setState({ items: newItems });
  }

  addNewItem = (text) => {
    if (!inputIsNotEmpty(text)) {
      return;
    }

    const id = createNewId();
    const item = { text, id };
    const newItems = this.state.items.concat(item);

    this.setState({ items: newItems });
  }

  changeItemText = (id, newText) => {
    const newItems = this.state.items.map(item => {
      if (item.id === id) {
        return { ...item, text: newText };
      }
      return item;
    });

    this.setState({ items: newItems });
  }

  render() {
    const listItems = this.state.items.map((item, index) =>
      <div
        key={item.id}
        className="row"
      >
        <div className="col-sm">
          <li className="list-group-item">
            <ListItem
              item={item}
              number={index + 1}
              onSave={this.changeItemText}
              onDelete={this.onDelete}
            />
          </li>
        </div>
      </div>
    );

    return (
      <div className="container">
        <ol className="list-group">
          {listItems}

          <div className="row">
            <div className="col-sm">
              <li className="list-group-item">
                <NewItemForm onAdd={this.addNewItem} />
              </li>
            </div>
          </div>
        </ol>
      </div>
    );
  }
}
