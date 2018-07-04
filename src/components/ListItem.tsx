import * as React from 'react';
import * as PropTypes from 'prop-types';
import { EditedListItem } from '../containers/EditedListItem';
import { UneditedListItem } from '../containers/UneditedListItem';
import { ItemId } from '../models/ItemId';

export interface IListItemDataProps {
  text: string;
  id: ItemId;
  isBeingEdited: boolean;
  synchronized: boolean;
  index: number;
  errorMessage: string;
  isBeingDeleted: boolean;
}

export interface IListItemCallbackProps {
  onDivClick: React.MouseEventHandler<HTMLDivElement>;
}

const ListItem: React.StatelessComponent<IListItemDataProps & IListItemCallbackProps>  = ({ id, isBeingEdited, index, synchronized, errorMessage, isBeingDeleted, onDivClick, text}) => {

  const className = 'list-group-item form-inline' + (synchronized ? '' : ' alert-warning') + (!errorMessage ? '' : ' alert-danger') + (!isBeingDeleted ? '' : ' being-deleted');

  if (isBeingDeleted)
    return (null);

  return(
    <div
      className={className}
      key={id}
      onClick={isBeingEdited ? undefined : onDivClick}
    >
      {index + 1}
      .&nbsp;

      {isBeingEdited ?
      <EditedListItem
        itemId={id}
      /> :
      <UneditedListItem
        itemId={id}
        text={text}
      />}
      </div>);
};

ListItem.displayName = 'ListItem';

ListItem.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isBeingEdited: PropTypes.bool.isRequired,
  synchronized: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  errorMessage: PropTypes.string,
  isBeingDeleted: PropTypes.bool.isRequired,
  onDivClick: PropTypes.func.isRequired,
};

export { ListItem };
