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
    onEditItem: PropTypes.func.isRequired,
    onDeleteItem: PropTypes.func.isRequired,
  };

  state = {
    isActive: false,
  };

  _activateItem = () => this.setState({ isActive: true });

  _saveItem = text => {
    this.props.onEditItem(text);
    this.setState({ isActive: false });
  };

  _cancelItem = () => this.setState({ isActive: false });

  render() {
    return (
      <li className="list-group-item">
        {
          this.state.isActive
            ? (
              <ActiveItem
                index={this.props.index}
                item={this.props.item}
                onSaveItem={this._saveItem}
                onCancelItem={this._cancelItem}
                onDeleteItem={this.props.onDeleteItem}
              />)
            : (
              <InactiveItem
                index={this.props.index}
                item={this.props.item}
                onItemClick={this._activateItem}
              />)
        }
      </li>
    );
  }
}
