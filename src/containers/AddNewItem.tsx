import {
  connect
} from 'react-redux';
import { ComponentClass } from 'react';
import { Dispatch} from 'redux';
import {
  AddNewItem as AddNewItemComponent,
  IAddNewItemCallbackProps,
  IAddNewItemDataProps
} from '../components/AddNewItem';
import { IAppState } from '../reducers/IAppState';
import { CreateUploadItem } from '../actions';
import { refreshNewItemText } from '../actions/simpleActions/refreshNewItemText';
import { assertAlert } from '../utils/assertAlert';

const mapStateToProps = ({items: {newItemText}}: IAppState): IAddNewItemDataProps => ({
  newItemText,
});

const mapDispatchToProps = (dispatch: Dispatch<IAppState>): IAddNewItemCallbackProps => ({
  onAdd: (value: string) => dispatch(CreateUploadItem(value)),
  onNewTextChange: (newText: string) => dispatch(refreshNewItemText(newText)),
  assertAlert: (type, message) =>  assertAlert(type, message),
});

export const AddNewItem: ComponentClass = connect(mapStateToProps, mapDispatchToProps)(AddNewItemComponent);
