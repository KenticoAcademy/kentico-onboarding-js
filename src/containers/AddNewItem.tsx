import { connect } from 'react-redux';
import { ComponentClass } from 'react';
import { AddNewItem as AddNewItemComponent, IAddNewItemCallbackProps, IAddNewItemDataProps } from '../components/AddNewItem';
import { IAppState } from '../stores/IAppState';
import { generateId } from '../utils/generateId';
import { addItem, updateNewItemText } from '../actions/actionCreators';

const mapStateToProps = ({ items: { newItemText} }: IAppState): IAddNewItemDataProps => ({
  newItemText,
});

const mapDispatchToProps = (dispatch: Function): IAddNewItemCallbackProps => ({
  onAdd: (value: string) => dispatch(addItem(generateId(), value)),
  onNewTextChange: (newText: string) => dispatch(updateNewItemText(newText)),
});

export const AddNewItem: ComponentClass = connect(mapStateToProps, mapDispatchToProps)(AddNewItemComponent);
