import React, { PureComponent } from 'react';
import { ListItem } from './ListItem';
import { EditedListItem } from './EditedListItem';
import { defaultListItems } from '../constants/defaultListItems';
import { generateId } from '../utils/generateId';
import { Item } from '../models/Item';

export class List extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      listItems: defaultListItems,
    };
  }

  toggleEditing = (itemId) => {
    this.setState((prevState) => {
      return {
        listItems: prevState.listItems.update(
          itemId, record => record.merge({
            isBeingEdited: !record.isBeingEdited,
          })),
      };
    });
  };

  deleteItem = (itemId) => {
    this.setState((prevState) => {
      return {
        listItems: prevState.listItems.delete(itemId),
      };
    });
  };

  updateItemText = (itemId, newText) => {
    this.setState((prevState) => {
      return {
        listItems: prevState.listItems.update(
          itemId, record => record.merge({
            value: newText,
            isBeingEdited: !record.isBeingEdited,
          })),
      };
    });
  };

  render() {
    return (<div>{
        this.state.listItems.valueSeq().map((item, index) => (
          <div
            className="list-group-item form-inline"
            key={item.id}
          >{index + 1}
            {'. '}
            {item.isBeingEdited ?
              <EditedListItem
                item={item}
                onToggleEditing={this.toggleEditing}
                onItemDeletion={this.deleteItem}
                onItemSaved={this.updateItemText}
              /> : <ListItem
                item={item}
                onToggleEditing={this.toggleEditing}
              />}
          </div>
        ))
      }</div>
    );
  }
}
