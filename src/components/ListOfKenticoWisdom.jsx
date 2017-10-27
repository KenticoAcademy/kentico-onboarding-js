import React from 'react';
import { ListItem } from './ListItem';

export class ListOfKenticoWisdom extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      editing: [],
      texts: [
        {
          value: 'Make a coffee',
          id: 1,
        },
        {
          value: 'Master React',
          id: 2,
        },
        {
          value: 'Learn Redux',
          id: 3,
        },
        {
          value: 'Help making Draft awesome',
          id: 4,
        },
      ],
      newItem: '',
    };
  }

  handleNewItemNameChange = (e) => {
    this.setState({ newItem: e.target.value });
  };

  handleAddNewItem = () => {
    this.setState((prevState) => {
      const newItem = {
        value: prevState.newItem,
        id: 0,
      };
      if (this.state.texts.length > 0) {
        newItem.id = prevState.texts[prevState.texts.length - 1].id + 1;
      }
      return {
        texts: [...prevState.texts, newItem],
        newItem: '',
      };
    });
  };

  makeEditing = (item) => {
    this.setState((prevState) => {
      return {
        editing: [...prevState.editing, item.id],
      };
    });
  };

  cancelEditing = (item) => {
    this.setState((prevState) => {
      const arrayWithoutItem = prevState.editing;
      if (prevState.editing.includes(item.id)) {
        arrayWithoutItem.splice(arrayWithoutItem.indexOf(item.id), 1);
      }
      return {
        editing: arrayWithoutItem,
      };
    });
  };

  deleteItem = (item) => {
    this.cancelEditing(item);
    this.setState((prevState) => {
      const arrayWithoutText = prevState.texts;
      if (prevState.texts.includes(item)) {
        arrayWithoutText.splice(arrayWithoutText.indexOf(item), 1);
      }
      return {
        texts: arrayWithoutText,
      };
    });
  };

  render() {
    return (
      <form className="form-inline">{
        this.state.texts.map((text) =>
          <ListItem
            key={text.id}
            item={text}
            isEdited={this.state.editing.includes(text.id)}
            makeEditing={this.makeEditing}
            cancelEditing={this.cancelEditing}
            deleteItem={this.deleteItem}
          />
        )}
        <div className="list-group-item">
          <input
            className="form-control"
            type="text"
            value={this.state.newItem}
            onChange={this.handleNewItemNameChange}
          />
          <input
            className="btn btn-default"
            type="button"
            value="Add"
            onBlur={""}
            onClick={this.handleAddNewItem}
          />
        </div>
      </form>
    );
  }
}
