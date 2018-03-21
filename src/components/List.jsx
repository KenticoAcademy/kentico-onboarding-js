import React, { PureComponent } from 'react';
import assignment from './../../assignment.gif';

import { ListItem } from './ListItem.jsx';
import { CreateListItem } from './CreateListItem';

export class List extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };

    this._generateGuid = this._generateGuid.bind(this);
    this._createItem = this._createItem.bind(this);
    this._addItem = this._addItem.bind(this);
    this.onItemDelete = this.onItemDelete.bind(this);
    this.onItemUpdate = this.onItemUpdate.bind(this);
  }

  _generateGuid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  _createItem(itemText, itemId) {
    const id = itemId === undefined ? this._generateGuid() : itemId;

    return { id, text: itemText };
  }

  _addItem(itemText) {
    this.setState({
      items: this.state.items.concat([this._createItem(itemText)]),
    });
  }

  onItemDelete(itemId) {
    this.setState(prevState => {
      const newItems = prevState.items.slice();
      const index = newItems.findIndex(x => x.id === itemId);
      newItems.splice(index, 1);

      return { items: newItems };
    });
  }

  onItemUpdate(itemId, newText) {
    this.setState(prevState => {
      const newItems = prevState.items.slice();
      const index = newItems.findIndex(x => x.id === itemId);
      newItems.splice(index, 1, this._createItem(newText));

      return { items: newItems };
    });
  }

  render() {
    const listItems = this.state.items.map((item, index) => {
      return <ListItem id={item.id} number={index} key={item.id} text={item.text} onChange={this.onItemUpdate} onDelete={this.onItemDelete} />;
    });


    return (
      <div>
        <div className="row">
          <div className="col-sm-12">
            <img src={assignment} alt="assignment" className="img--assignment" />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-12">
            <form className="form-inline">
              <ul className="list-group">
                {listItems}
                <CreateListItem onSubmit={this._addItem} />
              </ul>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
