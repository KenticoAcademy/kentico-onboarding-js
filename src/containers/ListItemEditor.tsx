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
import { IAction } from '../actions/types/IAction';

const mapDispatchToProps =
  (dispatch: Dispatch<IAction>, { item: { key }}: IListItemOriginalProps): IListItemEditorDispatchProps => ({
    onCancelEdit: () => dispatch(stopItemEditing(key)),
    deleteItem: () => dispatch(deleteItem(key)),
    saveItem: () => dispatch(saveItem(key)),
    onChange: (itemValue: string) => dispatch(changeItemValue(key, itemValue)),
  });

export const ListItemEditor: React.ComponentClass<IListItemOriginalProps>
  = connect<undefined, IListItemEditorDispatchProps>(undefined, mapDispatchToProps)(ListItemEditorComponent);
