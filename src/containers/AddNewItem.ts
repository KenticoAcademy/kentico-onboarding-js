import {
  addItem,
  updateNewItemText,
} from '../actions/actionCreators.js';
import { generateId } from '../utils/generateId.js';
import { connect } from 'react-redux';
import { AddNewItem as AddNewItemComponent } from '../components/AddNewItem';
import { IAppState } from '../stores/IAppState';

const mapStateToProps = ({ items: { newItemText} }: IAppState) => ({
  newItemText,
});

const mapDispatchToProps = (dispatch: Function) => ({
  onAdd: (value: string) => dispatch(addItem(generateId(), value)),
  onNewTextChange: (newText: string) => dispatch(updateNewItemText(newText)),
});

export const AddNewItem = connect(mapStateToProps, mapDispatchToProps)(AddNewItemComponent);
