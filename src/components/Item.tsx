import * as React from 'react';
import * as PropTypes from 'prop-types';

import { ActiveItem } from './ActiveItem';
import { InactiveItem } from './InactiveItem';

import { IListItem, ListItem } from '../models/ListItem';

export interface IItemStateProps {
  item: IListItem;
  timeToRender: string;
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
        timeToRender={props.timeToRender}
        onSaveItem={props.onSaveItem}
        onCancelItem={props.onToggleItem}
        onDeleteItem={props.onDeleteItem}
      />)
    : (
      <InactiveItem
        item={props.item}
        timeToRender={props.timeToRender}
        onItemClick={props.onToggleItem}
      />)
);

Item.displayName = 'Item';

Item.propTypes = {
  item: PropTypes.instanceOf(ListItem).isRequired,
  timeToRender: PropTypes.string.isRequired,
  onSaveItem: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onToggleItem: PropTypes.func.isRequired,
};
