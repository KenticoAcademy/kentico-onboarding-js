import * as React from 'react';
import * as PropTypes from 'prop-types';
import { EditedListItem } from '../containers/EditedListItem';
import { UneditedListItem } from '../containers/UneditedListItem';
import { ItemId } from '../models/ItemId';

export interface IListItemDataProps {
  id: ItemId;
  isBeingEdited: boolean;
}

const ListItem: React.StatelessComponent<IListItemDataProps>  = ({ id, isBeingEdited }) => (
    isBeingEdited ?
      <EditedListItem
        itemId={id}
      /> :
      <UneditedListItem
        itemId={id}
      />);

ListItem.displayName = 'ListItem';

ListItem.propTypes = {
  id: PropTypes.string.isRequired,
  isBeingEdited: PropTypes.bool.isRequired,
};

export { ListItem };
