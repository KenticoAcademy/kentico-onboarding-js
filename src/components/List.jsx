import React, { PureComponent } from 'react';
import { AddedItem } from './AddedItem';
import { generateId } from '../utils/generateId';
import { TsComponent } from './TsComponent.tsx';
import { Item } from './Item';
import { getInitialItems } from '../utils/getItems';
import { ListItem } from '../models/ListItem';

export class List extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      items: getInitialItems(),
    };
  }

  addItem = (newText) => {
    const guid = generateId();

    this.setState((prevState) => ({
      items: prevState.items
        .set(guid, new ListItem({
          id: guid,
          text: newText,
        })),
    }));
  };

  deleteItem = (id) => {
    this.setState((prevState) => ({
      items: prevState.items
        .delete(id),
    }));
  };

  saveItem = (guid, savedText) => {
    const item = {
      id: guid,
      text: savedText,
      isEdited: false,
    };
    this.setState((prevState) => ({
      items: prevState.items
        .mergeIn([guid], item),
    }));
  };

  setIsEdited = (guid, isEdited) => {
    this.setState((prevState) => ({
      items: prevState.items
        .setIn([
          guid,
          'isEdited',
        ], isEdited),
    }));
  };

  cancel = (id) => {
    this.setIsEdited(id, false);
  };

  clickOnText = (id) => {
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
              .entrySeq()
              .map(([uniqueKey, item], index) =>
                <Item
                  key={uniqueKey}
                  item={item}
                  index={index + 1}
                  onDeleteItem={this.deleteItem}
                  onSaveItem={this.saveItem}
                  onCancel={this.cancel}
                  onTextClick={this.clickOnText}
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
