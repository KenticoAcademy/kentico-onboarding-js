import { connect } from 'react-redux';
import { NewItem } from '../components/NewItem';
import { addItem } from '../actions/index';

const mapDispatchToProps = (dispatch) => ({
  onAddClick: (text) => dispatch(addItem(text)),
});

const ConnectedNewItem = connect(null, mapDispatchToProps)(NewItem);
export { ConnectedNewItem as NewItem };
