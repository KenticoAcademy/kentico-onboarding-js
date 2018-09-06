import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { EditItem } from '../containers/EditItem';
import { ShowItem } from '../containers/ShowItem';

export class Item extends PureComponent {
  static displayName = 'Item';

  static propTypes = {
    id: PropTypes.string.isRequired,
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
              id={this.props.id}
              position={this.props.position}
              finishEdit={this._finishEditItem}
            />)
          : (
            <ShowItem
              position={this.props.position}
              id={this.props.id}
              onEditStart={this._startEditItem}
            />)
        }
      </li>
    );
  }
}
