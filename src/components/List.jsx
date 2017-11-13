import React, { PureComponent } from 'react';
import { ListItem } from './ListItem.jsx';

export class List extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      newItemText: '',
    };

    this.guid = this.guid.bind(this);
    this.deleteClick = this.deleteClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.renumberItems = this.renumberItems.bind(this);
  }

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  renumberItems(items, deletedNumber) {
    const changedItems = items.map(item => {
      if (item.number > deletedNumber) {
        const changedItem = Object.assign({}, item);
        changedItem.number = item.number - 1;
        return changedItem;
      }
      return item;
    });

    return changedItems;
  }

  deleteClick(guid) {
    let deletedNumber;
    let newItems = this.state.items.filter(
      (item) => {
        if (item.guid === guid) {
          deletedNumber = item.number;
        }

        return item.guid !== guid;
      }
    );

    if (deletedNumber) {
      newItems = this.renumberItems(newItems, deletedNumber);
    }

    this.setState({ items: newItems });
  }

  handleSubmit(e) {
    const text = this.state.newItemText;

    if (text === '') {
      return;
    }

    const counter = this.state.items.length + 1;
    const guid = this.guid();
    const item = { number: counter, text, guid };
    const newItems = this.state.items.concat(item);
    this.setState({ items: newItems, newItemText: '' });
    e.preventDefault();
  }

  handleInputChange(e) {
    this.setState({ newItemText: e.target.value });
  }

  render() {
    const listItems = this.state.items.map(item => <ListItem key={item.guid} item={item} deleteClick={() => this.deleteClick(item.guid)} />);
    const nonNumberedListItem = { listStyleType: 'none' };
    return (
      <div className="row">
        <ol className="list-group">
          {listItems}
          <li style={nonNumberedListItem} className="list-group-item">
            <div className="input-group">
              <input className="form-control" type="text" value={this.state.newItemText} onChange={this.handleInputChange} />
              <button className="btn btn-secondary" onClick={this.handleSubmit} >Add</button>
            </div>
          </li>
        </ol>
      </div>
    );
  }
}
