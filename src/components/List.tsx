import * as React from 'react';
import { NewItem } from '../containers/NewItem';
import { Item } from '../containers/Item';
import * as PropTypes from 'prop-types';

interface IListGroupItemProps {
  readonly children: React.ReactNode;
}

const ListGroupItem: React.StatelessComponent<IListGroupItemProps> = ({children}: IListGroupItemProps) => (
  <li className="list-group-item">
    {children}
  </li>);

ListGroupItem.displayName = 'ListGroupItem';

export interface IListStateProps {
  readonly itemsIds: Array<Uuid>;
}

export const List: React.StatelessComponent<IListStateProps>
  = ({itemsIds}: IListStateProps) => {
  const _renderedItems =
    itemsIds
      .map((id, index) => (
        <ListGroupItem key={id}>
          <Item
            id={id}
            index={index + 1}
          />
        </ListGroupItem>),
      );

  return (
    <div className="col-sm-12 col-md-offset-2 col-md-8">
            <pre>
                <ul className="list-group">
                  {_renderedItems}
                  <ListGroupItem>
                    <NewItem />
                  </ListGroupItem>
                </ul>
            </pre>
    </div>
  );
};

List.displayName = 'List';

List.propTypes = {
  itemsIds: PropTypes.array.isRequired,
};
