import * as React from 'react';
import * as PropTypes from 'prop-types';
import { EditItem } from '../containers/EditItem';
import { ShowItem } from '../containers/ShowItem';

interface IItemProps {
  readonly id: Guid;
  readonly position: number;
}

interface IItemState {
  readonly isEdited: boolean;
}

export class Item extends React.PureComponent<IItemProps, IItemState> {
  static displayName = 'Item';

  static propTypes: PropTypes.ValidationMap<IItemProps> = {
    id: PropTypes.string.isRequired,
    position: PropTypes.number.isRequired,
  };

  state = {
    isEdited: false,
  };

  private _startEditItem = (): void => this.setState(() => ({isEdited: true}));

  private _finishEditItem = (): void => this.setState(() => ({isEdited: false}));

  private _renderStateIsEdited = (): JSX.Element => (
    this.state.isEdited
      ? (
        <EditItem
          id={this.props.id}
          position={this.props.position}
          onCancel={this._finishEditItem}
        />)
      : (
        <ShowItem
          position={this.props.position}
          id={this.props.id}
          onEditStart={this._startEditItem}
        />)
  );

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
