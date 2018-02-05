import { connect, Dispatch } from 'react-redux';
import { ComponentClass } from 'react';
import { AddNewItem as AddNewItemComponent, IAddNewItemCallbackProps, IAddNewItemDataProps } from '../components/AddNewItem';
import { IAppState } from '../reducers/IAppState';
import { addItem, updateNewItemText } from '../actions';

const mapStateToProps = ({items: {newItemText}}: IAppState): IAddNewItemDataProps => ({
  newItemText,
});

const mapDispatchToProps = (dispatch: Dispatch<IAppState>): IAddNewItemCallbackProps => ({
  onAdd: (value: string) => dispatch(addItem(value)),
  onNewTextChange: (newText: string) => dispatch(updateNewItemText(newText)),
});

export const AddNewItem: ComponentClass = connect(mapStateToProps, mapDispatchToProps)(AddNewItemComponent);
