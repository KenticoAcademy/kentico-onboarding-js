import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ListError } from '../../../models/ListError';
import { ItemError } from '../../../containers/list/items/ItemError';
import { ItemLoader } from './ItemLoader';
import { ListItem } from '../../../models/ListItem';

export interface IPlainItemOwnProps {
  readonly index: number;
  readonly id: Uuid;
}

export interface IPlainItemDispatchProps {
  readonly startEditing: () => void;
}

export interface IPlainItemStateProps {
  readonly item: ListItem;
  readonly error?: ListError;
}

type PlainItemProps = IPlainItemDispatchProps & IPlainItemOwnProps & IPlainItemStateProps;

export class PlainItem extends React.PureComponent<PlainItemProps> {
  static displayName = 'PlainItem';
  static propTypes = {
    index: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired,
    error: PropTypes.object,
    startEditing: PropTypes.func.isRequired,
  };

  _showError = (): JSX.Element | null =>
    this.props.error
      ? (
        <ItemError
          error={this.props.error}
        />
      )
      : null;

  render(): JSX.Element {
    const textClass = `float-right col mt-1 py-1
      ${this.props.item.isUpdating || this.props.error ? 'text-black-50' : 'text-dark'}`;

    return (
      <div
        onClick={this.props.error ? undefined : this.props.startEditing}
        className={textClass}
      >
        {this.props.index}.&nbsp;{this.props.item.text}
        {this.props.item.isUpdating && <ItemLoader />}
        {this._showError()}
      </div>
    );
  }
}
