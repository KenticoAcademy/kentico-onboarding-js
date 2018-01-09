import {
  addItem,
  updateNewItemText,
} from '../actions/actionCreators';
import { generateId } from '../utils/generateId';
import { connect } from 'react-redux';
import { AddNewItem as AddNewItemComponent } from '../components/AddNewItem.tsx';

const mapStateToProps = ({ items: { newItemText } }) => ({
  newItemText,
});

const mapDispatchToProps = (dispatch) => ({
  onAdd: (value) => dispatch(addItem(generateId(), value)),
  onNewTextChange: (newText) => dispatch(updateNewItemText(newText)),
});

export const AddNewItem = connect(mapStateToProps, mapDispatchToProps)(AddNewItemComponent);
