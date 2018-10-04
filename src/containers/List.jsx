import connect from 'react-redux/es/connect/connect';
import { List } from '../components/List';
import { getMemoizedIds } from '../selectors/itemSelector';

const mapStateToProps = ({ items }) => ({
  itemsIds: getMemoizedIds(items)
});

const ConnectedList = connect(mapStateToProps)(List);
export { ConnectedList as List };
