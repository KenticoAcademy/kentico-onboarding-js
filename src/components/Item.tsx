import * as React from 'react';
import { PureComponent } from 'react';
import * as PropTypes from 'prop-types';
import { EditItem } from '../containers/EditItem';
import { ShowItem } from '../containers/ShowItem';

interface IItemProps {
  readonly id: GUID;
  readonly position: number;
}

export class Item extends PureComponent<IItemProps> {
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

  _renderStateIsEdited(): JSX.Element {
    return this.state.isEdited
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
        />);
  }

  render(): JSX.Element {
    return (
      <li
        className="list-group-item"
      >
        {this._renderStateIsEdited()}
      </li>
    );
  }
}
