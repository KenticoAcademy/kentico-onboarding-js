import * as React from 'react';
import * as PropTypes from 'prop-types';
import { UnsyncedListItemForm } from '../containers/UnsyncedListItemForm';
import { SyncedListItemForm } from '../containers/SyncedListItemForm';
import { IListItem } from '../models/interfaces/IListItem';
import { IItemSyncInfo } from '../models/interfaces/IItemSyncInfo';
import { SyncState } from '../models/enums/SyncState';

export interface IListItemFormOwnProps {
  readonly item: IListItem;
  readonly itemNumber: number;
  readonly selectionRangeStarts: number;
  readonly selectionRangeEnds: number;
  readonly itemSyncInfo: IItemSyncInfo;
}

export const listItemFormPropTypes = {
  itemNumber: PropTypes.number.isRequired,
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  selectionRangeStarts: PropTypes.number.isRequired,
  selectionRangeEnds: PropTypes.number.isRequired,
  itemSyncInfo: PropTypes.shape({
    syncState: PropTypes.string.isRequired,
    operation: PropTypes.string.isRequired,
  }).isRequired,
};

const ListItemForm: React.SFC<IListItemFormOwnProps> = (props) =>
  props.itemSyncInfo.syncState === SyncState.Synced ?
    <SyncedListItemForm { ...props } /> :
    <UnsyncedListItemForm { ...props } />;

ListItemForm.propTypes = listItemFormPropTypes;

export { ListItemForm };
