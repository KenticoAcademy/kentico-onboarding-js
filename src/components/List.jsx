// components/List.jsx

import React from 'react';
import { getIdentifier } from '../utils/uuidService';

import { NewItem } from './NewItem';
import { ListItem } from './ListItem';

export class List extends React.PureComponent {
  static displayName = 'List';

  state = {
    items: [],
  };

  _addItem = (itemValue) => this.setState(prevState => ({
    items: [
      ...prevState.items,
      {
        key: getIdentifier(),
        value: itemValue,
      },
    ],
  }));

  _saveItem = (item, updatedValue) => {
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

  _deleteItem = (item) => {
    const newItems = this.state.items
      .filter(arrayItem => arrayItem.key !== item.key);
    this.setState({ items: newItems });
  };

  render() {
    const list = this.state.items
      .map((item, index) => {
        const itemWithBullet = {
          ...item,
          bullet: index + 1,
        };

        return (
          <div className="list-group-item" key={item.key}>
            <ListItem
              item={itemWithBullet}
              onSave={this._saveItem}
              onDelete={this._deleteItem}
            />
          </div>
        );
      });

    return (
      <div className="row">
        <div className="col-sm-12 col-md-offset-2 col-md-8">
          <div className="list-group">
            {list}
          </div>
          <NewItem onCreate={this._addItem} />
        </div>
      </div>
    );
  }
}
