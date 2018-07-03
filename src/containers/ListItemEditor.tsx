import { connect, Dispatch } from 'react-redux';

import {
  IListItemEditorDispatchProps,
  IListItemOriginalProps,
  ListItemEditor as ListItemEditorComponent,
} from '../components/ListItemEditor';
import {
  deleteItem,
  saveItem,
  stopItemEditing,
  changeItemValue,
  saveLocalItem,
  deleteLocalItem,
} from '../actions';
import { IState } from '../store/IState';

const mapDispatchToProps =
  (dispatch: Dispatch<IState>, { item: { key, temporaryValue, localOnly }}: IListItemOriginalProps): IListItemEditorDispatchProps => ({
    onCancelEdit: () => dispatch(stopItemEditing(key)),
    deleteItem: () => localOnly
      ? dispatch(deleteLocalItem(key))
      : dispatch(deleteItem(key)),
    saveItem: () => localOnly
      ? dispatch(saveLocalItem(key, temporaryValue))
      : dispatch(saveItem(key, temporaryValue)),
    onChange: (itemValue: string) => dispatch(changeItemValue(key, itemValue)),
  });

export const ListItemEditor: React.ComponentClass<IListItemOriginalProps>
  = connect<undefined, IListItemEditorDispatchProps>(undefined, mapDispatchToProps)(ListItemEditorComponent);
