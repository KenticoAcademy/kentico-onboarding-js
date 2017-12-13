import { connect } from 'react-redux';
import { AddNewItem as AddNewItemComponent, IAddNewItemCallbackProps, IAddNewItemDataProps } from '../components/AddNewItem';
import { IAppState } from '../stores/IAppState';
import { generateId } from '../utils/generateId';
import { addItem, updateNewItemText } from '../actions/actionCreators';
import { ComponentClass } from 'react';

interface IAddNewItemContainerProps {
}

const mapStateToProps = ({ items: { newItemText} }: IAppState): IAddNewItemDataProps => ({
  newItemText,
});

const mapDispatchToProps = (dispatch: Function): IAddNewItemCallbackProps => ({
  onAdd: (value: string) => dispatch(addItem(generateId(), value)),
  onNewTextChange: (newText: string) => dispatch(updateNewItemText(newText)),
});

export const AddNewItem: ComponentClass<IAddNewItemContainerProps> = connect(mapStateToProps, mapDispatchToProps)(AddNewItemComponent);
