import * as React from 'react';
import * as PropTypes from 'prop-types';
import { EditedListItem } from '../../containers/Items/EditedListItem';
import { UneditedListItem } from '../../containers/Items/UneditedListItem';
import { Markers } from '../../containers/Markers/Markers';
import { Item } from '../../models/Item';
import * as classNames from 'classnames';


export interface IListItemDataProps {
  item: Item;
  index: number;
  synchronizing: boolean;
  errorsNotEmpty: boolean;
}

const ListItem: React.StatelessComponent<IListItemDataProps> = (
  {item, index, synchronizing, errorsNotEmpty}) => {

  const {id, isBeingDeleted, isBeingEdited} = item;
  const listItemClassName = classNames({
    'list-group-item form-inline': true,
    'synchronizing': synchronizing,
    'alert-danger': errorsNotEmpty,
    'being-deleted': isBeingDeleted,
  });

  return (
    <div
      className={listItemClassName}
      key={id}
    >
      {index + 1}
      .&nbsp;

      {isBeingEdited ?
        <EditedListItem itemId={id} />
        : <UneditedListItem itemId={id} />
      }
      <Markers id={id} />
    </div>);
};

ListItem.displayName = 'ListItem';

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  synchronizing: PropTypes.bool.isRequired,
  errorsNotEmpty: PropTypes.bool.isRequired,
};

export { ListItem };
