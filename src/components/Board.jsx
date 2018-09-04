import React, { PureComponent } from 'react';
import ItemsList from '../containers/ItemsList';
import AddItem from '../containers/AddItem';

export class Board extends PureComponent {
  static displayName = 'Board';

  render() {
    return (
      <div>
        <ul className="list-group">
          <ItemsList />
          <li className="list-group-item">
            <AddItem />
          </li>
        </ul>
      </div>
    );
  }
}
