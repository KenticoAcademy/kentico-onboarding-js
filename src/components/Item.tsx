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
    isEdited: false,
  };

  _startEditItem = () => this.setState(() => ({ isEdited: true }));

  _finishEditItem = () => this.setState(() => ({ isEdited: false }));

  render() {
    return (
      <li
        className="list-group-item"
      >
        {this.state.isEdited
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
