import { connect } from 'react-redux';
import { List as ListComponent } from '../components/List';
import { memoized } from '../selectors/selector';

const mapStateToProps = (state) => {
  return {
    ids: memoized(state.items.byId.keySeq()),
  };
};

export const List = connect(mapStateToProps)(ListComponent);

