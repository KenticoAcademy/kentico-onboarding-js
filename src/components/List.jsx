import React, { PureComponent } from 'react';
import { AddedItem } from './AddedItem';
import { generateId } from '../utils/generateId';
import { generateList } from '../utils/initItemList';
import { TsComponent } from './TsComponent.tsx';
import { Item } from './Item';

export class List extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      items: this.generateItems(),
    };
  }

  generateItems = () =>
    generateList()
      .map((itemText) => ({
        id: generateId(),
        text: itemText,
        isEdited: false,
      }));

  addItem = (newText) => {
    this.setState((prevState) => ({
      items:
      [
        ...prevState.items,
        {
          id: generateId(),
          text: newText,
          isEdited: false,
        },
      ],
    }));
  };

  deleteItem = (id) => {
    this.setState((prevState) => ({
      items: prevState.items
        .filter((item) => item.id !== id),
    }));
  };

  saveItem = (id, savedText) => {
    this.setState((prevState) => ({
      items: prevState.items
        .map((item) =>
          ((item.id !== id)
              ? item
              : ({
                id: item.id,
                text: savedText,
                isEdited: false,
              })
          ),
        ),
    }));
  };

  setIsEdited = (id, edited) => {
    this.setState((prevState) => ({
      items: prevState.items
        .map((item) =>
          ((item.id !== id)
              ? item
              : ({
                id: item.id,
                text: item.text,
                isEdited: edited,
              })
          ),
        ),
    }));
  };

  cancel = (id) => {
    this.setIsEdited(id, false);
  };

  clickedOnText = (id) => {
    this.setIsEdited(id, true);
  };

  render() {
    return (
      <div className="row">
        <div className="row">
          <div className="col-sm-12 text-center">
            <TsComponent name="𝕱𝖆𝖓𝖈𝖞" />
          </div>
        </div>
        <div className="col-sm-12 col-md-offset-2 col-md-8">
          <ul className="list-group">
            {this.state.items
              .map((item, index) =>
                <Item
                  key={item.id}
                  item={item}
                  index={index + 1}
                  onDeleteItem={this.deleteItem}
                  onSaveItem={this.saveItem}
                  onCancel={this.cancel}
                  onTextClick={this.clickedOnText}
                />,
              )
            }
            <AddedItem onAddItem={this.addItem} />
          </ul>
        </div>
      </div>
    );
  }
}
