import React from 'react';
import PropTypes from 'prop-types';

import { ActiveItem } from './ActiveItem.jsx';
import { InactiveItem } from './InactiveItem.jsx';

import { ListItem } from '../models/ListItem';

export class Item extends React.PureComponent {
  static displayName = 'Item';

  static propTypes = {
    index: PropTypes.number.isRequired,
    item: PropTypes.instanceOf(ListItem).isRequired,
    onSaveItem: PropTypes.func.isRequired,
    onDeleteItem: PropTypes.func.isRequired,
    onToggleItem: PropTypes.func.isRequired,
  };

  _saveItem = text => this.props.onSaveItem(text);

  render() {
    return (
      <li className="list-group-item">
        {
          this.props.item.isActive
            ? (
              <ActiveItem
                index={this.props.index}
                item={this.props.item}
                onSaveItem={this._saveItem}
                onCancelItem={this.props.onToggleItem}
                onDeleteItem={this.props.onDeleteItem}
              />)
            : (
              <InactiveItem
                index={this.props.index}
                item={this.props.item}
                onItemClick={this.props.onToggleItem}
              />)
        }
      </li>
    );
  }
}
