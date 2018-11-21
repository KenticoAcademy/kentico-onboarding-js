import * as React from 'react';
import { HotKeys, KeyMap } from 'react-hotkeys';
import * as PropTypes from 'prop-types';
import { AddItem } from '../containers/AddItem';
import { Item } from '../containers/Item';

export interface IBoardProps {
  readonly items: Array<string>;
}

const keyMap: KeyMap = {
  'saveOrAdd': 'enter',
};

export class Board extends React.PureComponent<IBoardProps> {
  static displayName = 'Board';

  static propTypes: PropTypes.ValidationMap<IBoardProps> = {
    items: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  };

  private _renderItems = (): JSX.Element[] =>
    this.props.items
      .map((id, index) => (
        <Item
          key={id}
          id={id}
          position={index + 1}
        />
      ));

  render(): JSX.Element {
    return (
      <HotKeys keyMap={keyMap}>
        <div>
          <ul className="list-group">
            {this._renderItems()}
            <li className="list-group-item">
              <AddItem />
            </li>
          </ul>
        </div>
      </HotKeys>
    );
  }
}
