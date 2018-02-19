import { ComponentClass } from 'react';
import { connect } from 'react-redux';
import {
  ICompleteListItemFormCallbackProps,
  CompleteListItemForm as CompleteListItemFormComponent,
} from '../components/CompleteListItemForm';
import { Dispatch } from 'redux';
import {
  deleteItemAsync,
  saveNewTextAsync,
} from '../actions/thunk';
import { IAppState } from '../models/state/IAppState';
import { changeItemOpenState } from '../actions';
import {
  IListItemFormOwnProps,
  listItemFormPropTypes
} from '../components/ListItemForm';

const mapDispatchToProps = (dispatch: Dispatch<IAppState>, { item: { id } }: IListItemFormOwnProps): ICompleteListItemFormCallbackProps => ({
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

const SyncedListItemForm: ComponentClass<IListItemFormOwnProps> = connect(
  null,
  mapDispatchToProps,
)(CompleteListItemFormComponent);

SyncedListItemForm.propTypes = listItemFormPropTypes;

export { SyncedListItemForm };
