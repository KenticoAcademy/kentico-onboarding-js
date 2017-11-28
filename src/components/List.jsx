import React, { PureComponent } from 'react';
import { ListItem } from './ListItem';
import { EditedListItem } from './EditedListItem';

export class List extends PureComponent {
  render() {
    const { itemsMap, deleteItem, updateItemText, toggleEditing } = this.props;

    return (<div>{
        itemsMap.valueSeq().map((item, index) => (
          <div
            className="list-group-item form-inline"
            key={item.id}
          >{index + 1}
            {'. '}
            {item.isBeingEdited ?
              <EditedListItem
                text={item.text}
                onSave={(newText) => updateItemText(item.id, newText)}
                onDelete={() => deleteItem(item.id)}
                onCancel={() => toggleEditing(item.id, false)}
              /> : <ListItem
                text={item.text}
                onClick={() => toggleEditing(item.id, true)}
              />}
          </div>
        ))
      }</div>
    );
  }
}
