import * as React from 'react';
import { PureComponent } from 'react';
import * as PropTypes from 'prop-types';
import { AddItem } from '../containers/AddItem';
import { Item } from './Item';

export interface IBoardProps {
  readonly items: Array<string>;
}

export class Board extends PureComponent<IBoardProps> {
  static displayName = 'Board';

  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  _renderItems(): JSX.Element {
    const itemsJSX = this.props.items
      .map((id, index) => (
        <Item
          key={id}
          id={id}
          position={Number(index) + 1}
        />
      ));

    return (<> {itemsJSX} </>);
  }

  render(): JSX.Element {
    return (
      <div>
        <ul className="list-group">
          {this._renderItems()}
          <li className="list-group-item">
            <AddItem />
          </li>
        </ul>
      </div>
    );
  }
}
