import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Item } from './Item';

interface IListProps {
  readonly items: Array<string>;
}

export const List: React.SFC<IListProps> = ({ items }) => {
  const itemsJSX = items
    .map((id, index) => (
      <Item
        key={id}
        id={id}
        position={Number(index) + 1}
      />
    ));

  return (<> {itemsJSX} </>);
};

List.displayName = 'List';

List.propTypes = {
  items: PropTypes.array.isRequired,
  // items: PropTypes.arrayOf(PropTypes.string).isRequired, // doesn't work with TypeScript - problem with null
};
