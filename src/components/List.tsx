import * as React from 'react';
import * as PropTypes from 'prop-types';

import { Item } from '../containers/Item';
import { AddItem } from '../containers/AddItem';

export interface IListStateProps {
  itemIds: Uuid[];
}

type IListProps = IListStateProps;

export const List: React.StatelessComponent<IListProps> = (props: IListProps) => (
  <div className="row">
    <div className="col-sm-12 col-md-16">
      <ul className="list-group">
        <AddItem />
        {
          props.itemIds.map((itemId: Uuid, index: number) => (
            <Item
              key={itemId}
              index={index}
              id={itemId}
            />
          ))
        }
      </ul>
    </div>
  </div>
);

List.displayName = 'List';

List.propTypes = {
  itemIds: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};
