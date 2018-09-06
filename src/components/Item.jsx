import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { EditItem } from '../containers/EditItem';
import { ShowItem } from './ShowItem';
import { ItemRecord } from '../models/ItemRecord';

export class Item extends PureComponent {
  static displayName = 'Item';

  static propTypes = {
    item: PropTypes.instanceOf(ItemRecord).isRequired,
    position: PropTypes.number.isRequired,
  };

  state = {
    edit: false,
  };

  _startEditItem = () => this.setState(() => ({ edit: true }));

  _finishEditItem = () => this.setState(() => ({ edit: false }));

  render() {
    return (
      <li
        className="list-group-item"
      >
        {this.state.edit
          ? (
            <EditItem
              item={this.props.item}
              position={this.props.position}
              finishEdit={this._finishEditItem}
            />)
          : (
            <ShowItem
              position={this.props.position}
              text={this.props.item.text}
              onEditStart={this._startEditItem}
            />)
        }
      </li>
    );
  }
}
