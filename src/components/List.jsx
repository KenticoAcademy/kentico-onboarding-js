import React, { PureComponent } from 'react';
import { ListItem } from './ListItem';
import { EditedListItem } from './EditedListItem';

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
              /> : <ListItem
                item={item}
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
