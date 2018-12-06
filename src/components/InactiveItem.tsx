import * as React from 'react';
import * as PropTypes from 'prop-types';

import { IListItem, ListItem } from '../models/ListItem';

interface IInactiveItemProps {
  item: IListItem;
  timeToRender: string;
  onItemClick: () => void;
}

export const InactiveItem: React.StatelessComponent<IInactiveItemProps> = (props: IInactiveItemProps) => (
  <a className="list-group-item list-group-item-action" onClick={props.onItemClick}>
  <div className="row">
    <strong className="col-sm-2 py-2">
      {
        props.timeToRender
      }
      </strong>
    <div className="py-2 ml-4 pl-1">
        {props.item.text}
    </div>
  </div>
  </a>
);

InactiveItem.displayName = 'InactiveItem';

InactiveItem.propTypes = {
  item: PropTypes.instanceOf(ListItem).isRequired,
  timeToRender: PropTypes.string.isRequired,
  onItemClick: PropTypes.func.isRequired,
};
