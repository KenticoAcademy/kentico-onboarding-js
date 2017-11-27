import { addItem } from '../actions/actionCreators';
import { generateId } from '../utils/generateId';
import { connect } from 'react-redux';
import { AddNewItem } from '../components/AddNewItem';

const mapDispatchToProps = (dispatch) => ({
  onAdd: (value) => dispatch(addItem(generateId(), value)),
});

export default connect(null, mapDispatchToProps)(AddNewItem);
