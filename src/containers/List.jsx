import connect from 'react-redux/es/connect/connect';
import { List } from '../components/List';
import { memoizedIds } from '../selectors/itemSelector';

const mapStateToProps = ({ items }) => ({
  itemsIds: memoizedIds(items.keySeq())
});

const ConnectedList = connect(mapStateToProps)(List);
export { ConnectedList as List };
