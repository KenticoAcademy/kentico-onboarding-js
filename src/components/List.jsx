import React, { Component } from 'react';
import assignment from './../../assignment.gif';
import { ListItem } from './ListItem';
import { NewItemForm } from './NewItemForm';
import { EditedListItem } from './EditedListItem';
import { defaultListItems } from '../constants/defaultListItems';
import { generateId } from '../utils/generateId';
import Immutable from 'immutable';

const listItems = Immutable.OrderedMap(defaultListItems);

export class List extends Component {

  addNewItem = (text) => {
    const newItem = Immutable.Record({
      value: text,
      isBeingEdited: false,
    });
    listItems.set(generateId(), newItem);
  };

  toggleEditing = (key) => {
    listItems.update(key, record => Immutable.Record({
      value: record.value,
      isBeingEdited: !record.isBeingEdited,
    }));
  };

  deleteItem = (item) => {
    listItems.delete(item.get('id'));
  };

  updateItemText = (item, newText) => {
    listItems.map(listItem => (listItem.id === item.id
      ? {
        value: newText,
        isBeingEdited: false,
      } : listItem));
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
          listItems.map((item, index) => (
            <div
              className="list-group-item form-inline"
              key={item.key}
            >
              {item.value.isBeingEdited ?
                <EditedListItem
                  key={item.key}
                  item={item.value}
                  onToggleEditing={this.toggleEditing}
                  onItemDeletion={this.deleteItem}
                  onItemSaved={this.updateItemText}
                  position={index + 1}
                /> : <ListItem
                  key={item.key}
                  item={item.value}
                  onToggleEditing={this.toggleEditing}
                  position={index + 1}
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
