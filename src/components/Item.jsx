import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { EditItem } from './EditItem';
import { ShowItem } from './ShowItem';

export class Item extends PureComponent {
  static displayName = 'Item';

  static propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    position: PropTypes.number.isRequired,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
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
              text={this.props.text}
              finishEdit={this._finishEditItem}
              onSave={this.props.onSave}
              onDelete={this.props.onDelete}
            />)
          : (
            <ShowItem
              onEditStart={this._startEditItem}
              position={this.props.position}
              text={this.props.text}
            />)
        }
      </li>
    );
  }
}
