import * as React from 'react';
import * as PropTypes from 'prop-types';

import { ActiveItem } from './ActiveItem';
import { InactiveItem } from './InactiveItem';

import { IListItem, ListItem } from '../models/ListItem';

export interface IItemStateProps {
  item: IListItem;
}

export interface IItemDispatchProps {
  onSaveItem: (text: string) => void;
  onDeleteItem: () => void;
  onToggleItem: () => void;
}

type IItemProps = IItemStateProps & IItemDispatchProps;

export const Item: React.StatelessComponent<IItemProps> = (props: IItemProps) => (
  props.item.isActive
    ? (
      <ActiveItem
        item={props.item}
        onSaveItem={props.onSaveItem}
        onCancelItem={props.onToggleItem}
        onDeleteItem={props.onDeleteItem}
      />)
    : (
      <InactiveItem
        item={props.item}
        onItemClick={props.onToggleItem}
      />)
);

Item.displayName = 'Item';

Item.propTypes = {
  item: PropTypes.instanceOf(ListItem).isRequired,
  onSaveItem: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onToggleItem: PropTypes.func.isRequired,
};
