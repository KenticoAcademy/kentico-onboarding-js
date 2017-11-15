import React, { Component } from 'react';
import assignment from './../../assignment.gif';
import { ListItem } from './ListItem';
import { NewItemForm } from './NewItemForm';
import { EditedListItem } from './EditedListItem';
import { defaultListItems } from '../constants/defaultListItems';
import { generateId } from '../utils/generateId';
import { ItemPattern } from '../models/ItemPattern';

export class List extends Component {

  constructor(props) {
    super(props);

    this.state = {
      listItems: defaultListItems,
    };
  }

  addNewItem = (text) => {
    const newItem = new ItemPattern({
      id: generateId(),
      value: text,
    });
    this.setState({
      listItems: this.state.listItems.set(newItem.id, newItem),
    });
  };

  toggleEditing = (item) => {
    this.setState({
      listItems: this.state.listItems.update(item.id, record => new ItemPattern({
        id: item.id,
        value: record.value,
        isBeingEdited: !record.isBeingEdited,
      })),
    });
  };

  deleteItem = (item) => {
    // listItems.delete(item.get('id'));
  };

  updateItemText = (item, newText) => {
    /* listItems.map(listItem => (listItem.id === item.id
      ? {
        value: newText,
        isBeingEdited: false,
      } : listItem)); */
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
              key={index}
            > {index + 1}
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
