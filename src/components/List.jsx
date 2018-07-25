import React from 'react';
import assignment from '../assignment.gif';

import { TsComponent } from './TsComponent.tsx';
import { Item } from './Item.jsx';
import { AddItem } from './AddItem.jsx';

import { ListItem } from '../models/ListItem';
import { guid } from '../utils/guid';
import { getDefaultList } from '../utils/getDefaultList';

export class List extends React.PureComponent {
  static displayName = 'List';

  state = {
    list: getDefaultList(),
  };

  _editItem = (id, text) => this.setState(prevState => ({
    list: prevState.list.mergeIn([id], { text })
  }));

  _deleteItem = id => this.setState(prevState => ({
    list: prevState.list.delete(id)
  }));


  _addItem = text => this.setState(prevState => {
    const id = guid();

    return {
      list: prevState
        .list
        .set(
          id,
          new ListItem({
            id,
            text
          })
        )
    };
  });

  render() {
    return (
      <div className="row">
        {/* TODO: You can delete the assignment part once you do not need it */}
        <div className="row">
          <div className="col-sm-12 text-center">
            <TsComponent name="𝕱𝖆𝖓𝖈𝖞" />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <p className="lead text-center">
              Desired functionality is captured in the gif image.
            </p>
            <p className="lead text-center">
              <b>
                Note:
              </b>
              Try to make solution easily extensible (e.g. more displayed fields per item like
              <code>
                dateCreated
              </code>
              ).
            </p>
            <img
              src={assignment}
              alt="assignment"
              className="img--assignment"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-offset-2 col-md-8">
            <ul className="list-group">
              {
                this.state.list.valueSeq()
                  .toArray()
                  .map((item, index) => (
                      <Item
                        key={item.id}
                        index={index}
                        item={item}
                        onEditItem={this._editItem}
                        onDeleteItem={this._deleteItem}
                      />
                    )
                  )
              }
              <AddItem onAddItem={this._addItem} />
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
