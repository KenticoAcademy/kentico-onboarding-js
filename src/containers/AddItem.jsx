import { connect } from 'react-redux';
import { AddItem as AddItemComponent } from '../components/AddItem';
import { addItem } from '../actions/ListActions';

const mapDispatchToProps = (dispatch) => ({
  onAddItem: (text) => dispatch(addItem(text)),
});

export const AddItem = connect(null, mapDispatchToProps)(AddItemComponent);
