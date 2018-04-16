import { connect } from 'react-redux';
import { List as ListComponent } from '../components/List';
import { selectItemIdsMemoized } from '../selectors/selectItemIdsMemoized';
import { IAppState } from '../reducers/IAppState';


const mapStateToProps = (state: IAppState) => ({
    ids: selectItemIdsMemoized(state.items.byId),
    isFetching: state.items.status.isFetching,
  });

export const List = connect(mapStateToProps)(ListComponent);

