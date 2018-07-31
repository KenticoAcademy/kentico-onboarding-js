import * as React from 'react';
import * as PropTypes from 'prop-types';

import { ActiveItem } from './ActiveItem';
import { InactiveItem } from './InactiveItem';

import { IListItem, ListItem } from '../models/ListItem';

export interface IItemOwnProps {
  index: number;
}

export interface IItemStateProps {
  item: IListItem;
}

export interface IItemDispatchProps {
  onSaveItem: (text: string) => void;
  onDeleteItem: () => void;
  onToggleItem: () => void;
}

type IItemProps = IItemStateProps & IItemDispatchProps & IItemOwnProps;

interface IItemState {
  isActive: boolean;
}

export class Item extends React.PureComponent<IItemProps, IItemState> {
  static displayName = 'Item';

  static propTypes = {
    index: PropTypes.number.isRequired,
    item: PropTypes.instanceOf(ListItem).isRequired,
    onSaveItem: PropTypes.func.isRequired,
    onDeleteItem: PropTypes.func.isRequired,
    onToggleItem: PropTypes.func.isRequired,
  };

  _saveItem = (text: string) => this.props.onSaveItem(text);

  render(): JSX.Element {
    return (
      <li className="list-group-item">
        {
          this.props.item.isActive
            ? (
              <ActiveItem
                index={this.props.index}
                item={this.props.item}
                onSaveItem={this._saveItem}
                onCancelItem={this.props.onToggleItem}
                onDeleteItem={this.props.onDeleteItem}
              />)
            : (
              <InactiveItem
                index={this.props.index}
                item={this.props.item}
                onItemClick={this.props.onToggleItem}
              />)
        }
      </li>
    );
  }
}
