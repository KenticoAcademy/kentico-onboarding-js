import * as React from 'react';
import * as PropTypes from 'prop-types';
import { EditedListItem } from '../../containers/Items/EditedListItem';
import { UneditedListItem } from '../../containers/Items/UneditedListItem';
import { Markers } from '../../containers/Markers/Markers';
import { Item } from '../../models/Item';

export interface IListItemDataProps {
  item: Item;
  index: number;
}

const ListItem: React.StatelessComponent<IListItemDataProps> = (
  {item, index}) => {

  const {id} = item;
  const className = 'list-group-item form-inline'
    + (!item.synchronized && item.errorMessages.size === 0 ? ' synchronizing' : '')
    + (item.errorMessages.size === 0 ? '' : ' alert-danger')
    + (!item.isBeingDeleted ? '' : ' being-deleted');

  return (
    <div
      className={className}
      key={id}
    >
      {index + 1}
      .&nbsp;

      {item.isBeingEdited ?
        <EditedListItem
          itemId={id}
        /> :
        <UneditedListItem
          itemId={id}
        />}

      <Markers id={id} />
    </div>);
};

ListItem.displayName = 'ListItem';

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export { ListItem };
