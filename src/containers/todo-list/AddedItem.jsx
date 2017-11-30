import { connect } from 'react-redux';
import { AddedItem } from '../../components/todo-list/AddedItem';
import { insertItem } from '../../actions/actionCreators';

const mapDispatchToProps = (dispatch) => ({
  onAddItem: (text) => dispatch(insertItem(text)),
});

const enhancer = connect(undefined, mapDispatchToProps);
const connectedComponent = enhancer(AddedItem);

export { connectedComponent as AddedItem };
