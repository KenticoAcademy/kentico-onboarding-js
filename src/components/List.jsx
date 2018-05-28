import React, { PureComponent } from 'react';
import { OrderedMap } from 'immutable';
import assignment from './../../assignment.gif';

import { ListItem } from './ListItem.jsx';
import { CreateListItem } from './CreateListItem';
import { ItemData } from '../models/ListItemData.jsx';
import { UniqueIdentifier } from '../utils/UniqueIdentifier';

export class List extends PureComponent {
  static displayName = 'List';

  state = {
    items: OrderedMap(),
  };

  _addItem = itemText => {
    const item = new ItemData({
      id: UniqueIdentifier.generateUniqueId(),
      text: itemText,
    });
    this.setState(prevState => ({
      items: prevState.items.set(item.id, item),
    }));
  };

  _deleteItem = (itemId) => {
    return this.setState(prevState => ({
      items: prevState.items.delete(itemId),
    }));
  };

  _updateItemText = (itemId, newText) => {
    const item = new ItemData({
      id: itemId,
      text: newText,
    });
    this.setState(prevState => ({
      items: prevState.items.set(itemId, item),
    }));
  };

  _toggleItemEdit = (itemId, onlyTurnOn = false) => {
    if (!onlyTurnOn || !this.state.items.get(itemId).isEdited) {
      this.setState(prevState => ({
        items: prevState.items.update(itemId, item => item.update('isEdited', value => !value)),
      }));
    }
  };

  render() {
    const listItems = this.state.items.valueSeq().map((item, index) =>
      <ListItem
        id={item.id}
        key={item.id}
        number={index + 1}
        text={item.text}
        onChange={this._updateItemText}
        onDelete={this._deleteItem}
        onToggle={this._toggleItemEdit}
        inEditMode={item.isEdited}
      />);

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
