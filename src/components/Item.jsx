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
    this.props.onEditItem(this.props.item.id, text);
    this.setState({ isActive: false });
  };

  _cancelItem = () => this.setState({ isActive: false });

  _deleteItem = () => this.props.onDeleteItem(this.props.item.id);

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
                onDeleteItem={this._deleteItem}
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
