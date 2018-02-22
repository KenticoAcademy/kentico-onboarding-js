// components/List.jsx

import React from 'react';
import { getUUIDv4 } from '../utils/uuidService';

import { NewItem } from './NewItem';
import { ListItem } from './ListItem';

export class List extends React.PureComponent {
  static displayName = 'List';

  state = {
    items: [],
  };

  addItem = (itemValue) => this.setState(prevState => ({
    items: [
      ...prevState.items,
      {
        key: getUUIDv4(),
        value: itemValue,
      },
    ],
  }));

  saveItem = (item, updatedValue) => {
    const newItems = this.state.items
      .map(itemInList => (itemInList.key === item.key
          ? {
            key: item.key,
            value: updatedValue,
          }
          : itemInList
      ));

    this.setState({ items: newItems });
  };

  deleteItem = (item) => {
    const newItems = this.state.items
      .filter(arrayItem => arrayItem.key !== item.key);
    this.setState({ items: newItems });
  };

  render() {
    const list = this.state.items
      .map((item, index) => (
        {
          key: item.key,
          value: item.value,
          bullet: index + 1,
        }
      ))
      .map(item => (
        <div className="list-group-item" key={item.key}>
          <ListItem
            item={item}
            onSave={this.saveItem}
            onDelete={this.deleteItem}
          />
        </div>
      ));

    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8">
          <div className="list-group">
            {list}
          </div>
          <NewItem onCreate={this.addItem} />
        </div>
      </div>
    );
  }
}
