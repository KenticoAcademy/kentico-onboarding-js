import React, { Component } from 'react';
import assignment from './../../assignment.gif';
import { ListItem } from './ListItem';

export class List extends Component {

  constructor(props) {
    super(props);

    this.state = {
      listItems: [
        {
          value: 'Make a coffee',
          id: this.generateId(),
          isBeingEdited: false,
        },
        {
          value: 'Master React',
          id: this.generateId(),
          isBeingEdited: false,
        },
        {
          value: 'Learn Redux',
          id: this.generateId(),
          isBeingEdited: false,
        },
        {
          value: 'Help making Draft awesome',
          id: this.generateId(),
          isBeingEdited: false,
        },
      ],
      newItemText: '',
    };
  }

  generateId = () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  };

  newItemTextChange = (e) => {
    this.setState({ newItemText: e.target.value });
  };

  addNewItem = () => {
    this.setState((prevState) => {
      const newItem = {
        value: prevState.newItemText,
        id: this.generateId(),
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
      const listWithoutItem = prevState.listItems;
      if (prevState.listItems.includes(item)) {
        listWithoutItem.splice(listWithoutItem.indexOf(item), 1);
      }
      return {
        listItems: listWithoutItem,
      };
    });
  };

  renderAddField = () => {
    return (
      <div className="list-group-item">
        <input
          className="form-control"
          type="text"
          value={this.state.newItemText}
          onChange={this.newItemTextChange}
        />
        <input
          className="btn btn-default"
          type="button"
          value="Add"
          onBlur={""}
          onClick={this.addNewItem}
        />
      </div>);
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

        <div className="row">
          <div className="form-inline">{
            this.state.listItems.map((item) =>
              <ListItem
                key={item.id}
                item={item}
                onToggleEditing={this.toggleEditing}
                onItemDeletion={this.deleteItem}
              />
            )}
            <this.renderAddField />
          </div>
        </div>
        <br />
      </div>
    );
  }
}
