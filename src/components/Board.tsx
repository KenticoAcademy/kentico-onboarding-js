import * as React from 'react';
import { PureComponent } from 'react';
import { List } from '../containers/List';
import { AddItem } from '../containers/AddItem';

export class Board extends PureComponent {
  static displayName = 'Board';

  render() {
    return (
      <div>
        <ul className="list-group">
          <List />
          <li className="list-group-item">
            <AddItem />
          </li>
        </ul>
      </div>
    );
  }
}
