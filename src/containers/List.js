import connect from 'react-redux/es/connect/connect';
import { List } from '../components/List';
import { getItemsIds } from '../selectors/getItemsIds';

const mapStateToProps = ({ todoListReducer: { items } }) => ({
  itemsIds: getItemsIds(items)
});

const ConnectedList = connect(mapStateToProps)(List);
export { ConnectedList as List };
