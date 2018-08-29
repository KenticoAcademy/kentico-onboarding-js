import * as React from 'react';
import * as PropTypes from 'prop-types';
import { EditedListItem } from '../containers/EditedListItem';
import { UneditedListItem } from '../containers/UneditedListItem';
import { ItemId } from '../models/ItemId';
import {
  Map,
} from 'immutable';
import { Markers } from '../containers/Markers';

export interface IListItemDataProps {
  id: ItemId;
  isBeingEdited: boolean;
  synchronized: boolean;
  index: number;
  errorMessages: Map<string, string>;
  isBeingDeleted: boolean;
}

const ListItem: React.StatelessComponent<IListItemDataProps> = (
  {id, isBeingEdited, index, synchronized, errorMessages, isBeingDeleted}) => {

  const className = 'list-group-item form-inline'
    + (!synchronized && errorMessages.size === 0 ? ' synchronizing' : '')
    + (errorMessages.size === 0 ? '' : ' alert-danger')
    + (!isBeingDeleted ? '' : ' being-deleted');

  return (
    <div
      className={className}
      key={id}
    >
      {index + 1}
      .&nbsp;

      {isBeingEdited ?
        <EditedListItem
          itemId={id}
        /> :
        <UneditedListItem
          itemId={id}
        />}

        <Markers id={id}/>
    </div>);
};

ListItem.displayName = 'ListItem';

ListItem.propTypes = {
  id: PropTypes.string.isRequired,
  isBeingEdited: PropTypes.bool.isRequired,
  synchronized: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  errorMessages: PropTypes.object,
  isBeingDeleted: PropTypes.bool.isRequired,
};

export { ListItem };
