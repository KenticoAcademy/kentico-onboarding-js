import connect from 'react-redux/es/connect/connect';
import { List } from '../components/List';
import { addItem } from '../actions';
import { memoizedIds } from '../selectors/itemSelector';

const mapStateToProps = (state) => ({
  itemsIds: memoizedIds(state.items.keySeq())
});

const mapDispatchToProps = (dispatch) => ({
  onAdd: (text) => dispatch(addItem(text))
});

const ConnectedList = connect(mapStateToProps, mapDispatchToProps)(List);
export { ConnectedList as List };
