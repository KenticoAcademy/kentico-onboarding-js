import * as React from 'react';
import * as PropTypes from 'prop-types';

import { IListItem, ListItem } from '../models/ListItem';

interface IInactiveItemProps {
  readonly item: IListItem;
  readonly timeToRender: string;
  readonly onItemClick: () => void;
}

export const InactiveItem: React.StatelessComponent<IInactiveItemProps> = (props: IInactiveItemProps) => (
  <div className="list-group-item list-group-item-action" onClick={props.onItemClick}>
    <div className="row">
      <span className="col-sm-2 py-2 font-weight-bold">
        {
          props.timeToRender
        }
        </span>
      <div className="py-2 ml-4 pl-1">
          {props.item.text}
      </div>
    </div>
  </div>
);

InactiveItem.displayName = 'InactiveItem';

InactiveItem.propTypes = {
  item: PropTypes.instanceOf(ListItem).isRequired,
  timeToRender: PropTypes.string.isRequired,
  onItemClick: PropTypes.func.isRequired,
};
