import React, { PureComponent } from 'react';
import { ListItem } from './ListItem.jsx';

import assignment from './../../assignment.gif';

import { TsComponent } from './TsComponent.tsx';

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
        {/* TODO: You can delete the assignment part once you do not need it */}
        <div className="row">
          <div className="col-sm-12 text-center">
            <TsComponent name="𝕱𝖆𝖓𝖈𝖞" />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <p className="lead text-center">Desired functionality is captured in the gif image. </p>
            <p className="lead text-center"><b>Note: </b>Try to make solution easily extensible (e.g. more displayed fields per item like
              <code>dateCreated</code>).</p>
            <img src={assignment} alt="assignment" className="img--assignment" />
          </div>
        </div>

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
      </div>
    );
  }
}
