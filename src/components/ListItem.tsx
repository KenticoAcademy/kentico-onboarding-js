import * as React from 'react';
import * as PropTypes from 'prop-types';
import { EditedListItem } from '../containers/EditedListItem';
import { UneditedListItem } from '../containers/UneditedListItem';
import { ItemId } from '../models/ItemId';

export interface IListItemDataProps {
  id: ItemId;
  isBeingEdited: boolean;
}

const ListItem: React.SFC<IListItemDataProps>  = ({ id, isBeingEdited }: IListItemDataProps): JSX.Element => {
  return (
    isBeingEdited ?
      <EditedListItem
        itemId={id}
      /> :
      <UneditedListItem
        itemId={id}
      />);
};
