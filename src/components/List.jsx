import React, { PureComponent } from 'react';
import assignment from './../../assignment.gif';
import { ListItem } from './ListItem';
import { NewItemForm } from './NewItemForm';
import { EditedListItem } from './EditedListItem';
import { defaultListItems } from '../constants/defaultListItems';
import { generateId } from '../utils/generateId';
import { Item } from '../models/Item';
import { createStore } from 'redux';

export class List extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      listItems: defaultListItems,
    };
  }

  addNewItem = (text) => {
    const newItem = new Item({
      id: generateId(),
      value: text,
    });
    this.setState((prevState) => {
      return {
        listItems: prevState.listItems.set(newItem.id, newItem),
      };
    });
  };

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
    return (
      <div className="row">
        <div className="row">
          <div className="col-sm-12">
            <p className="lead text-center">Desired functionality is captured in the gif image. </p>
            <p className="lead text-center"><b>Note: </b>Try to make solution easily extensible (e.g. more displayed fields per item like
              <code>dateCreated</code>).</p>
            <img src={assignment} alt="assignment" className="img--assignment" />
          </div>
        </div>

        <div className="col-sm-8">{
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
          ))}
          <NewItemForm
            onAddItem={this.addNewItem}
          />
          <br />
        </div>
      </div>
    );
  }
}
