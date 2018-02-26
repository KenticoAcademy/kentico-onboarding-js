import * as PropTypes from 'prop-types';
import {
  ComponentClass,
  connect,
  Dispatch
} from 'react-redux';
import { SyncOperation } from '../models/enums/SyncOperation';
import { IAction } from '../models/interfaces/IAction';
import {
  changeItemOpenState,
  deleteUnsavedItem,
  saveItemChangesRequest
} from '../actions';
import { IItemSyncInfo } from '../models/interfaces/IItemSyncInfo';
import {
  CompleteListItemForm as CompleteListItemFormComponent,
  ICompleteListItemFormCallbackProps
} from '../components/CompleteListItemForm';
import {
  IListItemFormOwnProps,
  listItemFormPropTypes
} from '../components/ListItemForm';

const propTypes = {
  ...listItemFormPropTypes,
  itemSyncInfo: PropTypes.object.isRequired,
};

export interface IUnsyncedListItemContainerProps extends IListItemFormOwnProps {
  readonly itemSyncInfo: IItemSyncInfo;
}

const mapDispatchToProps = (dispatch: Dispatch<IAction>,  { item: { id }, itemSyncInfo }: IUnsyncedListItemContainerProps): ICompleteListItemFormCallbackProps => ({
  onSave: (newText: string) =>
    dispatch(
      saveItemChangesRequest(
        id,
        newText,
      )),
  onDelete: itemSyncInfo.operation === SyncOperation.Add ?
    () => dispatch(
      deleteUnsavedItem(id)) :
    () => null,
  onCancel: () =>
    dispatch(
      changeItemOpenState(id)),
});

const UnsyncedListItemForm: ComponentClass<IUnsyncedListItemContainerProps> = connect(
  undefined,
  mapDispatchToProps,
)(CompleteListItemFormComponent);

UnsyncedListItemForm.propTypes = propTypes;

export { UnsyncedListItemForm };
