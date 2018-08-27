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
    <div className="row">
      <div className="col-sm-12 col-md-offset-2 col-md-8">
        <ul className="list-group">
          {
            props.itemIds.map((itemId: Uuid, index: number) => (
              <Item
                key={itemId}
                index={index}
                id={itemId}
              />
            ))
          }
          <AddItem />
        </ul>
      </div>
    </div>
  </div>
);

List.displayName = 'List';

List.propTypes = {
  itemIds: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};
