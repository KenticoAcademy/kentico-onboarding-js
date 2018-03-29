import React, { PureComponent } from 'react';
import Uuid from 'uuid/v4';
import assignment from './../../assignment.gif';

import { ListItem } from './ListItem.jsx';
import { CreateListItem } from './CreateListItem';

export class List extends PureComponent {
  static displayName = 'List';

  state = {
    items: [],
  };

  _addItem = itemText => {
    const newItem = {
      text: itemText,
      id: Uuid(),
    };

    this.setState(prevState => ({
      items: [
        ...prevState.items,
        newItem,
      ],
    }));
  };

  _deleteItem = (itemId) =>
    this.setState(prevState => ({
      items: prevState.items.filter(item => item.id !== itemId),
    }));

  _updateItem = (itemId, newText) =>
    this.setState(prevState => ({
      items: prevState.items.map(item => (
        item.id !== itemId
          ? item
          : {
            ...item,
            text: newText,
          })),
    }));

  render() {
    const listItems = this.state.items.map((item, index) =>
      <li className="list-group-item">
        <span>{index + 1}. </span>
        <ListItem
          id={item.id}
          key={item.id}
          text={item.text}
          onChange={this._updateItem}
          onDelete={this._deleteItem}
        />
      </li>);

    return (
      <div>
        <div className="row">
          <div className="col-sm-12">
            <img
              src={assignment}
              alt="assignment"
              className="img--assignment"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-12">
            <div className="form-inline">
              <ul className="list-group">
                {listItems}
                <CreateListItem onSubmit={this._addItem} />
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
