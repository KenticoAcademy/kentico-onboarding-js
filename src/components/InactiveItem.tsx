import * as React from 'react';
import * as PropTypes from 'prop-types';

import { IListItem, ListItem } from '../models/ListItem';

interface IInactiveItemProps {
  index: number;
  item: IListItem;
  onItemClick: () => void;
}

export const InactiveItem: React.StatelessComponent<IInactiveItemProps> = (props: IInactiveItemProps) => (
  <div onClick={props.onItemClick}>
    {props.index + 1}. {props.item.text}
  </div>
);

InactiveItem.displayName = 'InactiveItem';

InactiveItem.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.instanceOf(ListItem).isRequired,
  onItemClick: PropTypes.func.isRequired,
};
