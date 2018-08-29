import React, { PureComponent } from 'react';
import { TsComponent } from './TsComponent.tsx';
import { NewItem } from './NewItem';
import { Item } from './Item';
import { generateId } from '../utils/idGenerator';
import { validateInput } from '../utils/inputValidator';

export class List extends PureComponent {
  static displayName = 'List';

  constructor() {
    super();
    this.state = {
      items: []
    };
  }

  _addItem = itemText => {
    if (!validateInput(itemText)) {
      return;
    }
    const newItem = {
      id: generateId(),
      value: itemText
    };

    this.setState(prevState => ({
      items: {
        ...prevState.items,
        [newItem.id]: newItem
      }
    }));
  };

  _renderListItems = () => Object.keys(this.state.items).map((id, index) => (
    <li
      className="list-group-item"
      key={id}
    >
      <Item
        item={this.state.items[id]}
        index={index + 1}
        onEdit={this._editItem}
        onDelete={this._deleteItem}
      />
    </li>)
  );

  _deleteItem = (deletedItemId) => {
    const items = { ...this.state.items };
    delete items[deletedItemId];
    this.setState(() => ({
      items
    }));
  };

  _editItem = (id, value) => {
    if (!(validateInput(value))) {
      return;
    }
    const editedItem = {
      id,
      value
    };

    this.setState(prevState => ({
      items: {
        ...prevState.items,
        [editedItem.id]: editedItem
      }
    }));
  };

  render() {
    return (
      <div className="row">
        <div className="row">
          <div className="col-sm-12 text-center">
            <TsComponent
              name="𝕱𝖆𝖓𝖈𝖞"
              invisible
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-offset-2 col-md-8">
            <pre>
                <ul className="list-group">
                  {this._renderListItems()}
                  <li className="list-group-item">
                    <NewItem onAdd={this._addItem} />
                  </li>
                </ul>
            </pre>
          </div>
        </div>
      </div>
    );
  }
}
