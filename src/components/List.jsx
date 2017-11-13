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

  deleteClick(guid) {
    const newItems = this.state.items.filter(item => item.guid !== guid);
    this.setState({ items: newItems });
  }

  handleSubmit(e) {
    const text = this.state.newItemText;

    if (text === '') {
      return;
    }

    const newItems = this.state.items.slice();
    const item = { guid: this.guid(), text };
    newItems.push(item);
    this.setState({ items: newItems, newItemText: '' });
    e.preventDefault();
  }

  handleInputChange(e) {
    this.setState({ newItemText: e.target.value });
  }

  render() {
    const listItems = this.state.items.map(item =>
      <ListItem key={item.guid} item={item} deleteClick={() => this.deleteClick(item.guid)} />
    );
    const nonNumberedListItem = {};
    nonNumberedListItem['list-style-type'] = 'none';
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
