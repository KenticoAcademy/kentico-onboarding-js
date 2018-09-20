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
    'list__item': true,
    'synchronizing': synchronizing,
    'alert-danger': errorsNotEmpty,
    'being-deleted': isBeingDeleted,
  });

  return (
    <div className={listItemClassName}>
      <div className="list__item__content list__item--left">
        <div
          className=""
          key={id}
        >
          <div className="list__item__number list__item--leftie">
            {index + 1}.
          </div>
          {isBeingEdited ?
            <EditedListItem itemId={id} />
            : <UneditedListItem itemId={id} />
          }
        </div>
      </div>
      <div className="list__item__content list__item--right">
        <div className="">
          <Markers id={id} />
        </div>
      </div>
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
