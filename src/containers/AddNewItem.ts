import { connect } from 'react-redux';
import { AddNewItem as AddNewItemComponent } from '../components/AddNewItem';
import { IAppState } from '../stores/IAppState';
import { generateId } from '../utils/generateId';
import { addItem, updateNewItemText } from '../actions/actionCreators';

const mapStateToProps = ({ items: { newItemText} }: IAppState) => ({
  newItemText,
});

const mapDispatchToProps = (dispatch: Function) => ({
  onAdd: (value: string) => dispatch(addItem(generateId(), value)),
  onNewTextChange: (newText: string) => dispatch(updateNewItemText(newText)),
});

export const AddNewItem = connect(mapStateToProps, mapDispatchToProps)(AddNewItemComponent);
