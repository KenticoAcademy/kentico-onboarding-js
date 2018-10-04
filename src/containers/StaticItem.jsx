import { connect } from 'react-redux';
import { StaticItem } from '../components/StaticItem';
import { startEditing } from '../actions';

const mapDispatchToProps = (dispatch, { item }) => ({
  onItemClick: () => dispatch(startEditing(item.id)),
});

const ConnectedStaticItem = connect(null, mapDispatchToProps)(StaticItem);
export { ConnectedStaticItem as StaticItem };
