import { ComponentClass } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  ISyncedListItemFormCallbackProps,
  SyncedListItemForm as SyncedListItemFormComponent,
} from '../components/SyncedListItemForm';
import { Dispatch } from 'redux';
import {
  deleteItemAsync,
  saveNewTextAsync,
} from '../actions/thunk';
import { IListItem } from '../models/interfaces/IListItem';
import { IAppState } from '../models/state/IAppState';
import { changeItemOpenState } from '../actions';

export const syncedListItemFormContainerPropTypes = {
  itemNumber: PropTypes.number.isRequired,
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  selectionRangeStarts: PropTypes.number.isRequired,
  selectionRangeEnds: PropTypes.number.isRequired,
};

export interface ISyncedListItemFormContainerDataProps {
  readonly itemNumber: number;
  readonly item: IListItem;
  readonly selectionRangeStarts: number;
  readonly selectionRangeEnds: number;
}

const mapDispatchToProps = (dispatch: Dispatch<IAppState>, { item: { id } }: ISyncedListItemFormContainerDataProps): ISyncedListItemFormCallbackProps => ({
  onSave: (text: string, uri: string) =>
    dispatch(
      saveNewTextAsync({
        uri,
        text,
        id,
      })),
  onDelete: (uri: string) =>
    dispatch(
      deleteItemAsync({
        uri,
        id,
      })),
  onCancel: () =>
    dispatch(
      changeItemOpenState(id)),
});

const SyncedListItemForm: ComponentClass<ISyncedListItemFormContainerDataProps> = connect(
  null,
  mapDispatchToProps,
)(SyncedListItemFormComponent);

SyncedListItemForm.propTypes = syncedListItemFormContainerPropTypes;

export { SyncedListItemForm };
