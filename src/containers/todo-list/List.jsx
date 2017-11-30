import { connect } from 'react-redux';
import { List } from '../../components/todo-list/List';
import { getItemIds } from '../../selectors/getItemIds';

const mapStateToProps = (state) => ({
  ids: getItemIds(state),
});

const enhancer = connect(mapStateToProps);
const connectedComponent = enhancer(List);

export { connectedComponent as List };
