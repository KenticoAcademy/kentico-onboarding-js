import { addItem } from '../utils/actionCreators';
import { generateId } from '../utils/generateId';
import { connect } from 'react-redux';
import { AddNewItem } from '../components/AddNewItem';

const mapDispatchToProps = (dispatch) => ({
  onAdd: (value) => dispatch(addItem(value, generateId())),
});

export default connect(null, mapDispatchToProps)(AddNewItem);
