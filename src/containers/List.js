import { connect } from 'react-redux';
import { List as ListComponent } from '../components/List';
import memoize from 'fast-memoize';

const memoized = memoize((ids) => ids);

const mapStateToProps = (state) => {
  return {
    ids: memoized(state.items.byId.keySeq()),
  };
};

export const List = connect(mapStateToProps)(ListComponent);

