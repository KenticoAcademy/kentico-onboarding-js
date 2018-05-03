import { connect, Dispatch } from 'react-redux';
import { ComponentClass } from 'react';
import { AddNewItem as AddNewItemComponent, IAddNewItemCallbackProps, IAddNewItemDataProps } from '../components/AddNewItem';
import { IAppState } from '../reducers/IAppState';
import { updateNewItemText } from '../actions';
import { uploadItem } from '../actions/index';

const mapStateToProps = ({items: {newItemText}}: IAppState): IAddNewItemDataProps => ({
  newItemText,
});

const mapDispatchToProps = (dispatch: Dispatch<IAppState>): IAddNewItemCallbackProps => ({
  onAdd: (value: string) => uploadItem(dispatch)(value),
  onNewTextChange: (newText: string) => dispatch(updateNewItemText(newText)),
});

export const AddNewItem: ComponentClass = connect(mapStateToProps, mapDispatchToProps)(AddNewItemComponent);
