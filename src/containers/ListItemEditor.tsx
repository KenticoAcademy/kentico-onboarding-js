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
} from '../actions';
import { IState } from '../store/IState';

const mapDispatchToProps =
  (dispatch: Dispatch<IState>, { item: { key, temporaryValue }}: IListItemOriginalProps): IListItemEditorDispatchProps => ({
    onCancelEdit: () => dispatch(stopItemEditing(key)),
    deleteItem: () => dispatch(deleteItem(key)),
    saveItem: () => dispatch(saveItem(key, temporaryValue)),
    onChange: (itemValue: string) => dispatch(changeItemValue(key, itemValue)),
  });

export const ListItemEditor = connect(null, mapDispatchToProps)(ListItemEditorComponent);
