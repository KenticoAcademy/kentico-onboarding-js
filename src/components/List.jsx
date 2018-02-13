// components/List.jsx

import React from 'react';
import v4 from 'uuid/v4';

import { NewItem } from './NewItem';
import { ListItem } from './ListItem';

export class List extends React.PureComponent {
  static displayName = 'List';

  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  addItem = (itemValue) => this.setState(prevState => ({
    items: [
      ...prevState.items,
      {
        key: v4(),
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
    const listItemSpan = (index, item) => {
      return (
        <span className="input-group">
          <span className="input-group-addon">
            {index + 1}
          </span>
          <ListItem
            item={item}
            onSave={this.saveItem}
            onDelete={this.deleteItem}
          />
        </span>
      );
    };

    const list = this.state.items
      .map((item, index) => (
        <div className="list-group-item" key={item.key}>
          {listItemSpan(index, item)}
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
