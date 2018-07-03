import * as React from 'react';
import * as PropTypes from 'prop-types';
import { EditedListItem } from '../containers/EditedListItem';
import { UneditedListItem } from '../containers/UneditedListItem';
import { ItemId } from '../models/ItemId';

export interface IListItemDataProps {
  id: ItemId;
  isBeingEdited: boolean;
  synchronized: boolean;
  index: number;
  errorMessage: string;
  isBeingDeleted: boolean;
}

const ListItem: React.StatelessComponent<IListItemDataProps>  = ({ id, isBeingEdited, index, synchronized, errorMessage, isBeingDeleted }) => {

  const className = 'list-group-item form-inline' + (synchronized ? '' : ' alert-warning') + (!errorMessage ? '' : ' alert-danger') + (!isBeingDeleted ? '' : ' being-deleted');
  return(
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
      </div>);
};

ListItem.displayName = 'ListItem';

ListItem.propTypes = {
  id: PropTypes.string.isRequired,
  isBeingEdited: PropTypes.bool.isRequired,
  synchronized: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  errorMessage: PropTypes.string,
  isBeingDeleted: PropTypes.bool.isRequired,
};

export { ListItem };
