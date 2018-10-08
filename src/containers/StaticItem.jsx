import { connect } from 'react-redux';
import { StaticItem } from '../components/StaticItem';
import { startItemEditing } from '../actions';

const mapDispatchToProps = (dispatch, { item }) => ({
  onItemClick: () => dispatch(startItemEditing(item.id)),
});

const ConnectedStaticItem = connect(null, mapDispatchToProps)(StaticItem);
export { ConnectedStaticItem as StaticItem };
