import React, { Component } from 'react';
import assignment from './../../assignment.gif';
import { ListItem } from './ListItem';
import { NewItemForm } from './NewItemForm';
import { EditedListItem } from './EditedListItem';
import { defaultItemList } from './defaultItemList';
import { generateId } from './generateId';

export class List extends Component {

  constructor(props) {
    super(props);

    this.state = {
      listItems: defaultItemList,
      newItemText: '',
    };
  }

  newItemTextChange = (e) => {
    this.setState({ newItemText: e.target.value });
  };

  addNewItem = () => {
    this.setState((prevState) => {
      const newItem = {
        value: prevState.newItemText,
        id: generateId(),
        isBeingEdited: false,
      };
      return {
        listItems: [...prevState.listItems, newItem],
        newItemText: '',
      };
    });
  };

  toggleEditing = (item) => {
    this.setState((prevState) => {
      const updatedList = prevState.listItems;
      const index = updatedList.indexOf(item);
      updatedList[index].isBeingEdited = !item.isBeingEdited;

      return {
        listItems: updatedList,
      };
    });
  };

  deleteItem = (item) => {
    this.setState((prevState) => {
      const listWithoutItem = prevState.listItems.filter(arrayItem => arrayItem !== item);
      return {
        listItems: listWithoutItem,
      };
    });
  };

  updateItemText = (item, newText) => {
    const updatedItem = item;
    updatedItem.value = newText;
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

        <div className="row col-sm-8">{
          this.state.listItems.map((item, index) => (
            <div
              className="list-group-item"
              key={item.id}
            >{index + 1}{'. '}
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
            newItemText={this.state.newItemText}
            onAddItem={this.addNewItem}
            onTextChange={this.newItemTextChange}
          />
        </div>
        <br />
      </div>
    );
  }
}
