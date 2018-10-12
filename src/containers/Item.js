import { connect } from 'react-redux';
import { Item } from '../components/Item';

const mapStateToProps = ({ todoList: { items } }, { id }) => ({
  isInEditMode: items.get(id).isInEditMode
});

const ConnectedItem = connect(mapStateToProps)(Item);
export { ConnectedItem as Item };
