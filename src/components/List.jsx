import React from 'react';

import { uuidv4 } from './../utils/UUIDGenerator.js';
import { TsComponent } from './TsComponent.tsx';
import { NewItem } from './NewItem';
import { ListItem } from './ListItem';

export class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  addItem = (item) => this.setState(prevState => ({
    items: [...prevState.items, {
      key: uuidv4(),
      value: item,
    }],
  }));

  saveItem = (item) => {
    const { items } = this.state;
    const index = items.indexOf(x => x.key === item.key);
    items[index] = item;
    this.setState({ items });
  };

  deleteItem = (item) => {
    const newItems = this.state.items
      .filter(arrayItem => arrayItem.key !== item.key);
    this.setState({ items: newItems });
  };

  render() {
    const list = this.state.items
      .map((item, index) => (
        <div className="list-group-item" key={item.key}>
          <span className="input-group">
            <span className="input-group-addon">
              {index + 1}
            </span>
            <ListItem
              item={item}
              onSave={this.saveItem}
              onDelete={this.deleteItem}
            />
          </span>
        </div>
    ));

    return (
      <div className="row">
        <div className="row">
          <div className="col-sm-12 text-center">
            <TsComponent name="𝕱𝖆𝖓𝖈𝖞" />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-offset-2 col-md-8">
            <div className="list-group">
              {list}
            </div>
            <NewItem onCreate={this.addItem} />
          </div>
        </div>
      </div>
    );
  }
}
