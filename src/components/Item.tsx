import * as React from 'react';
import * as PropTypes from 'prop-types';

import { ActiveItem } from './ActiveItem';
import { InactiveItem } from './InactiveItem';

import { IListItem, ListItem } from '../models/ListItem';

export interface IItemStateProps {
  readonly item: IListItem;
  readonly timeToRender: string;
}

export interface IItemDispatchProps {
  readonly onSaveItem: (text: string) => void;
  readonly onDeleteItem: () => void;
  readonly onToggleItem: () => void;
}

interface IItemOwnProps {
  readonly onItemPropsChanged: () => void;
}

export type IItemProps = IItemStateProps & IItemDispatchProps & IItemOwnProps;

export class Item extends React.Component <IItemProps> {
  static displayName = 'Item';

  static propTypes = {
    item: PropTypes.instanceOf(ListItem).isRequired,
    timeToRender: PropTypes.string.isRequired,
    onSaveItem: PropTypes.func.isRequired,
    onDeleteItem: PropTypes.func.isRequired,
    onToggleItem: PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProps: IItemProps): boolean {
    const shouldUpdate = this.props.timeToRender !== nextProps.timeToRender || this.props.item !== nextProps.item;
    if (shouldUpdate) {
      this.props.onItemPropsChanged();
    }

    return shouldUpdate;
  }

  render(): JSX.Element {
    return (
      this.props.item.isActive
        ? (
          <ActiveItem
            item={this.props.item}
            timeToRender={this.props.timeToRender}
            onSaveItem={this.props.onSaveItem}
            onCancelItem={this.props.onToggleItem}
            onDeleteItem={this.props.onDeleteItem}
          />)
        : (
          <InactiveItem
            item={this.props.item}
            timeToRender={this.props.timeToRender}
            onItemClick={this.props.onToggleItem}
          />)
    );
  }
}
