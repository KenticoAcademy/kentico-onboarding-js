import React, { PureComponent } from 'react';
import ItemsList from '../containers/ItemsList';
import ItemAdd from '../containers/ItemAdd';

export class Board extends PureComponent {
  static displayName = 'Board';

  render() {
    return (
      <div>
        <ul className="list-group">
          <ItemsList />
          <li className="list-group-item">
            <ItemAdd />
          </li>
        </ul>
      </div>
    );
  }
}
