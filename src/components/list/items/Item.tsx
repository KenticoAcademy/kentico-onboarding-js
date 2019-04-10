import * as React from 'react';
import * as PropTypes from 'prop-types';
import { PlainItem } from '../../../containers/list/items/PlainItem';
import { EditedItem } from '../../../containers/list/items/EditedItem';

export interface IItemOwnProps {
  readonly index: number;
  readonly id: Uuid;
}

export interface IItemStateProps {
  readonly isEdited: boolean;
}

type ItemProps = IItemOwnProps & IItemStateProps;

export const Item: React.StatelessComponent<ItemProps> =
  ({index, id, isEdited}) => {
    const renderItem = isEdited
      ? (
        <EditedItem
          index={index}
          id={id}
        />
      )
      : (
        <PlainItem
          index={index}
          id={id}
        />
      );

    return (
      <li className="list-group-item">
        {renderItem}
      </li>
    );
  };

Item.displayName = 'Item';

Item.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  isEdited: PropTypes.bool.isRequired,
};
