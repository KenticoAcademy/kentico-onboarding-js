import * as React from 'react';
import * as PropTypes from 'prop-types';
import { DesyncedListItemForm } from '../containers/DesyncedListItemForm';
import { SyncedListItemForm } from '../containers/SyncedListItemForm';
import { IItemSyncInfo } from '../models/interfaces/IItemSyncInfo';
import { SyncState } from '../models/enums/SyncState';
import { IListItem } from '../models/interfaces/IListItem';

export interface IListItemFormDataProps {
  readonly item: IListItem;
}

export interface IListItemFormOwnProps {
  readonly itemNumber: number;
  readonly selectionRangeStarts: number;
  readonly selectionRangeEnds: number;
  readonly itemSyncInfo: IItemSyncInfo;
}

interface IListItemFormProps extends IListItemFormDataProps, IListItemFormOwnProps {}

const listItemFormPropTypes = {
  itemNumber: PropTypes.number.isRequired,
  item: PropTypes.shape({}).isRequired,
  selectionRangeStarts: PropTypes.number.isRequired,
  selectionRangeEnds: PropTypes.number.isRequired,
  itemSyncInfo: PropTypes.shape({
    syncState: PropTypes.string.isRequired,
    operation: PropTypes.string.isRequired,
  }).isRequired,
};

const ListItemForm: React.StatelessComponent<IListItemFormProps> = (props) =>
  props.itemSyncInfo.syncState === SyncState.Synced ?
    <SyncedListItemForm { ...props } /> :
    <DesyncedListItemForm { ...props } />;

ListItemForm.propTypes = listItemFormPropTypes;

export { ListItemForm };
