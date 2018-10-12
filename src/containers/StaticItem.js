import { connect } from 'react-redux';
import { StaticItem } from '../components/StaticItem';
import { startItemEditing } from '../actions';

const mapStateToProps = ({ todoList: { items } }, { id }) => ({
  item: items.get(id)
});

const mapDispatchToProps = (dispatch, { id }) => ({
  onItemClick: () => dispatch(startItemEditing(id)),
});

const ConnectedStaticItem = connect(mapStateToProps, mapDispatchToProps)(StaticItem);
export { ConnectedStaticItem as StaticItem };
