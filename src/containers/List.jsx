import { connect } from 'react-redux';
import { List as ListComponent } from '../components/List';
import { selectItemIdsMemoized } from '../selectors/selectItemIdsMemoized';

const mapStateToProps = (state) => {
  return {
    ids: selectItemIdsMemoized(state.items.byId),
  };
};

export const List = connect(mapStateToProps)(ListComponent);

