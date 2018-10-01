import * as React from 'react';
import * as PropTypes from 'prop-types';
import { EditItem } from '../containers/EditItem';
import { ShowItem } from '../containers/ShowItem';

export interface IItemStateProps {
  readonly id: Guid;
  readonly position: number;
}

export interface IItemDispatchStateProps {
  readonly isEdited: boolean;
}

export interface IItemProps extends IItemStateProps, IItemDispatchStateProps { }

export class Item extends React.PureComponent<IItemProps> {
  static displayName = 'Item';

  static propTypes: PropTypes.ValidationMap<IItemProps> = {
    id: PropTypes.string.isRequired,
    position: PropTypes.number.isRequired,
    isEdited: PropTypes.bool.isRequired,
  };

  private _renderStateIsEdited = (): JSX.Element => (
    this.props.isEdited
      ? (
        <EditItem
          id={this.props.id}
          position={this.props.position}
        />)
      : (
        <ShowItem
          position={this.props.position}
          id={this.props.id}
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
