import { connect } from 'react-redux';
import { NewItem } from '../components/NewItem';
import { addItem } from '../actions';

const mapDispatchToProps = (dispatch) => ({
  onAdd: (text) => dispatch(addItem(text)),
});

const ConnectedNewItem = connect(null, mapDispatchToProps)(NewItem);
export { ConnectedNewItem as NewItem };
