import * as React from 'react';
import * as PropTypes from 'prop-types';
import { EditedListItem } from '../../containers/Items/EditedListItem';
import { ItemErrorMessage } from '../../containers/Items/ItemErrorMessage';
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
    'list__item': true,
    'item--synchronizing': synchronizing,
    'item--error': errorsNotEmpty,
    'item--deleted': isBeingDeleted,
  });

  return (
    <div className={listItemClassName}>
      <div
        className="list__item_content--long"
        key={id}
      >
        <div className="list__item__inline_content">
          {index + 1}.&nbsp;
        </div>
        {isBeingEdited ?
          <EditedListItem itemId={id} />
          : <UneditedListItem itemId={id} />
        }
      </div>
      <ItemErrorMessage itemId={id} />
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
