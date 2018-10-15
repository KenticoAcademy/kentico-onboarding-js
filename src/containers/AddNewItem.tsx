import {
  connect
} from 'react-redux';
import { ComponentClass } from 'react';
import { Dispatch} from 'redux';
import {
  AddNewItem as AddNewItemComponent,
  IAddNewItemDispatchProps,
  IAddNewItemStateProps
} from '../components/AddNewItem';
import { IAppState } from '../reducers/IAppState';
import { CreateUploadItem } from '../actions';
import { refreshNewItemText } from '../actions/simpleActions/refreshNewItemText';

const mapStateToProps = ({items: {newItemText}}: IAppState): IAddNewItemStateProps => ({
  newItemText,
});

const mapDispatchToProps = (dispatch: Dispatch<IAppState>): IAddNewItemDispatchProps => ({
  onAdd: (value: string) => dispatch(CreateUploadItem(value)),
  onNewTextChange: (newText: string) => dispatch(refreshNewItemText(newText)),
});

export const AddNewItem: ComponentClass = connect(mapStateToProps, mapDispatchToProps)(AddNewItemComponent);
