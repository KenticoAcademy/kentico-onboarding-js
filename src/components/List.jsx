import React, { Component } from 'react';
import assignment from './../../assignment.gif';
import { ListItem } from './ListItem';
import { NewItemForm } from './NewItemForm';
import { EditedListItem } from './EditedListItem';
import { defaultListItems } from '../constants/defaultListItems';
import { generateId } from '../utils/generateId';

export class List extends Component {

  constructor(props) {
    super(props);

    this.state = {
      listItems: defaultListItems,
    };
  }

  addNewItem = (text) => {
    this.setState((prevState) => {
      const newItem = {
        value: text,
        id: generateId(),
        isBeingEdited: false,
      };
      return {
        listItems: [...prevState.listItems, newItem],
      };
    });
  };

  toggleEditing = (itemId) => {
    this.setState((prevState) => {
      return {
        listItems: prevState.listItems
          .map(listItem => (listItem.id === itemId
            ? {
              value: listItem.value,
              id: itemId,
              isBeingEdited: !listItem.isBeingEdited,
            } : listItem)),
      };
    });
  };

  deleteItem = (itemId) => {
    this.setState((prevState) => {
      return {
        listItems: prevState.listItems.filter(listItem => (listItem.id !== itemId)),
      };
    });
  };

  updateItemText = (itemId, newText) => {
    this.setState((prevState) => {
      return {
        listItems: prevState.listItems
          .map(listItem => (listItem.id === itemId
            ? {
              value: newText,
              id: itemId,
              isBeingEdited: false,
            } : listItem)),
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
          this.state.listItems.map((item, index) => (
            <div
              className="list-group-item form-inline"
              key={item.id}
            >{index + 1}
              {'. '}
              {item.isBeingEdited ?
                <EditedListItem
                  key={item.id}
                  item={item}
                  onToggleEditing={this.toggleEditing}
                  onItemDeletion={this.deleteItem}
                  onItemSaved={this.updateItemText}
                /> : <ListItem
                  key={item.id}
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
