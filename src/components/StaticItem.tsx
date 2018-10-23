import * as React from 'react';
import { IAction } from '../actions/IAction';
import { ListItem } from '../models/ListItem';
import * as PropTypes from 'prop-types';

export interface IStaticItemDispatchProps {
  readonly onItemClick: () => IAction;
}

export interface IStaticItemStateProps {
  readonly item: ListItem;
  readonly index: number;
}

type StaticItemProps = IStaticItemDispatchProps & IStaticItemStateProps;

export const StaticItem: React.StatelessComponent<StaticItemProps> = ({index, item, onItemClick}: StaticItemProps) => (
  <div onClick={onItemClick}>
    {index}. {item.text}
  </div>
);

StaticItem.displayName = 'StaticItem';

StaticItem.propTypes = {
  item: PropTypes.instanceOf(ListItem),
  index: PropTypes.number.isRequired,

  onItemClick: PropTypes.func.isRequired,
};
