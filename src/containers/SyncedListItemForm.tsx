import { ComponentClass } from 'react';
import { connect } from 'react-redux';
import {
  ICompleteListItemFormCallbackProps,
  CompleteListItemForm as CompleteListItemFormComponent,
} from '../components/CompleteListItemForm';
import { Dispatch } from 'redux';
import {
  deleteItemAsync,
  editItemAsync,
} from '../actions/thunk';
import { IAppState } from '../models/state/IAppState';
import { changeItemOpenState } from '../actions';
import {
  IListItemFormOwnProps,
  listItemFormPropTypes,
} from '../components/ListItemForm';

const mapDispatchToProps = (dispatch: Dispatch<IAppState>, { item }: IListItemFormOwnProps): ICompleteListItemFormCallbackProps => {
  const { syncedText, id } = item;

  return {
    onSave: (text: string) =>
      dispatch(
        editItemAsync({
          text,
          syncedText,
          id,
        }))
    ,
    onDelete: () =>
      dispatch(
        deleteItemAsync({
          id,
        })),
    onCancel: () =>
      dispatch(
        changeItemOpenState(id)),
  };
};

const SyncedListItemForm: ComponentClass<IListItemFormOwnProps> = connect(
  null,
  mapDispatchToProps,
)(CompleteListItemFormComponent);

SyncedListItemForm.propTypes = listItemFormPropTypes;

export { SyncedListItemForm };
