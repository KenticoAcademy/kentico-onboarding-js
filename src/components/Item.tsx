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

export const Item: React.StatelessComponent<IItemProps> = (props: IItemProps) => (
  props.item.isActive
    ? (
      <ActiveItem
        index={props.index}
        item={props.item}
        onSaveItem={props.onSaveItem}
        onCancelItem={props.onToggleItem}
        onDeleteItem={props.onDeleteItem}
      />)
    : (
      <InactiveItem
        index={props.index}
        item={props.item}
        onItemClick={props.onToggleItem}
      />)
);

Item.displayName = 'Item';

Item.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.instanceOf(ListItem).isRequired,
  onSaveItem: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onToggleItem: PropTypes.func.isRequired,
};
