import { connect, Dispatch } from 'react-redux';
import { ComponentClass } from 'react';
import { AddNewItem as AddNewItemComponent, IAddNewItemCallbackProps, IAddNewItemDataProps } from '../components/AddNewItem';
import { IAppState } from '../stores/IAppState';
import { generateId } from '../utils/generateId';
import { addItemFactory, updateNewItemText } from '../actions/actionCreators';

const mapStateToProps = ({ items: { newItemText} }: IAppState): IAddNewItemDataProps => ({
  newItemText,
});

const mapDispatchToProps = (dispatch: Dispatch<IAppState>): IAddNewItemCallbackProps => ({
  onAdd: (value: string) => dispatch(addItemFactory(generateId, value)),
  onNewTextChange: (newText: string) => dispatch(updateNewItemText(newText)),
});

export const AddNewItem: ComponentClass = connect(mapStateToProps, mapDispatchToProps)(AddNewItemComponent);
