import React, { PureComponent } from 'react';
import { TsComponent } from './TsComponent.tsx';
import { ListItem } from './ListItem';
import { generateUuid } from '../utils/generateUuid';
import { NewListItem } from './NewListItem';

export class List extends PureComponent {
  static displayName = 'List';

  state = {
    items: []
  };

  _addItem = newItemText => {
    const newItem = {
      id: generateUuid(),
      text: newItemText,
      isBeingEdited: false
    };

    this.setState(state => ({
      items: [...state.items, newItem]
    }));
  };

  _saveItem = changedItem => {
    const { id } = changedItem;
    this.setState(state => ({
      items: state.items.map(item => (item.id === id
        ? changedItem
        : item))
    }));
  };

  _deleteItem = id => {
    this.setState(state => ({
      items: state.items.filter(item => item.id !== id)
    }));
  };

  render() {
    const { items } = this.state;

    return (
      <div className="row">
        <div className="row">
          <div className="col-sm-12 text-center">
            <TsComponent name="𝕱𝖆𝖓𝖈𝖞" invisible />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-offset-2 col-md-8">
            <pre>
              <ul className="list-group list-group-flush">
                {items.map((item, i) => (
                  <ListItem
                    key={item.id}
                    order={i + 1}
                    onSave={this._saveItem}
                    onDelete={this._deleteItem}
                    {...item}
                  />
                ))}
              </ul>
              <NewListItem onAddItem={this._addItem}/>
            </pre>
          </div>
        </div>
      </div>
    );
  }
}
