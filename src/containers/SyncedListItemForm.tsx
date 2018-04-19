import { ComponentClass } from 'react';
import { connect } from 'react-redux';
import {
  ICompleteListItemFormCallbackProps,
  CompleteListItemForm as CompleteListItemFormComponent,
  ICompleteListItemFormOwnProps,
  completeListItemSharedPropTypes,
} from '../components/CompleteListItemForm';
import { Dispatch } from 'redux';
import {
  deleteItemAsync,
  updateItemAsync,
} from '../actions/thunk';
import { IAppState } from '../models/state/IAppState';
import { toggleItem } from '../actions';
import { IListItemFormOwnProps } from '../components/ListItemForm';

const mapDispatchToProps = (dispatch: Dispatch<IAppState>, { item }: ICompleteListItemFormOwnProps): ICompleteListItemFormCallbackProps => {
  const { syncedText, id } = item;

  return {
    onSave: (text: string) => dispatch(updateItemAsync({ text, syncedText, id })),
    onDelete: () => dispatch(deleteItemAsync({ id })),
    onCancel: () => dispatch(toggleItem(id)),
  };
};

const SyncedListItemForm: ComponentClass<IListItemFormOwnProps> = connect(
  null,
  mapDispatchToProps,
)(CompleteListItemFormComponent);

SyncedListItemForm.propTypes = completeListItemSharedPropTypes;

export { SyncedListItemForm };
