import { connect } from 'react-redux';
import { StaticItem } from '../components/StaticItem';
import { startEdit } from '../actions';

const mapDispatchToProps = (dispatch, { item }) => ({
  onStartEdit: () => dispatch(startEdit(item.id)),
});

const ConnectedStaticItem = connect(null, mapDispatchToProps)(StaticItem);
export { ConnectedStaticItem as StaticItem };
