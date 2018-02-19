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
}

interface IListItemFormProps extends IListItemFormOwnProps {
  readonly itemSyncInfo: IItemSyncInfo;
}

export const listItemFormPropTypes = {
  itemNumber: PropTypes.number.isRequired,
  item: PropTypes.shape({
    text: PropTypes.string.isRequired,
  }).isRequired,
  selectionRangeStarts: PropTypes.number.isRequired,
  selectionRangeEnds: PropTypes.number.isRequired,
};

const defaultProps = {
  itemSyncInfo: undefined,
};

const ListItemForm: React.SFC<IListItemFormProps> = ({ itemSyncInfo, ...props }) =>
  itemSyncInfo.state === SyncState.Synced ?
    <SyncedListItemForm { ...props } /> :
    <UnsyncedListItemForm { ...props } itemSyncInfo={itemSyncInfo} />;

ListItemForm.propTypes = {
  ...listItemFormPropTypes,
  itemSyncInfo: PropTypes.object,
};

ListItemForm.defaultProps = defaultProps;

export { ListItemForm };
