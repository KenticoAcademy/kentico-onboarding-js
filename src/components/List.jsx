import React from 'react';

import { uuidv4 } from './../utils/UUIDGenerator.js';
import { TsComponent } from './TsComponent.tsx';
import { NewItem } from './NewItem';
import { ListItem } from './ListItem';

export class List extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  addItem = (item) => this.setState(prevState => ({ items: [...prevState.items, { key: uuidv4(), value: item }] }));

  saveItem = (item) => {
    const newItems = this.state.items;
    newItems[item.key] = item.value;
    this.setState({ items: newItems });
  }

  deleteItem = (item) => {
    const newItems = this.state.items.filter(arrayItem => arrayItem.key !== item.key);
    this.setState({ items: newItems });
  }

  render() {
    const list = this.state.items.map(item => <ListItem key={item.key} item={item} onSave={this.saveItem} onDelete={this.deleteItem} />);

    return (
      <div className="row">
        <div className="row">
          <div className="col-sm-12 text-center">
            <TsComponent name="𝕱𝖆𝖓𝖈𝖞" />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-offset-2 col-md-8">
            <pre>
              <ol type="1">{list}</ol>
              <NewItem onCreate={this.addItem} />
            </pre>
          </div>
        </div>
      </div>
    );
  }
}
