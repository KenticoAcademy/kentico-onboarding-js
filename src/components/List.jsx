import React, { PureComponent } from 'react';
import { ListItem } from './ListItem';
import { EditedListItem } from './EditedListItem';
import Immutable from 'immutable';

export class List extends PureComponent {

  render() {
    const { store } = this.context;
    const state = store.getState();

    return (<div>{
        state.map((item, index) => (
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
        ))
      }</div>
    );
  }
}

List.contextTypes = {
  store: React.PropTypes.object,
};
