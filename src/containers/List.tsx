import { connect } from 'react-redux';
import {
  IListStateProps,
  List as ListComponent,
} from '../components/List';
import { selectItemIdsMemoized } from '../selectors/selectItemIdsMemoized';
import { IAppState } from '../reducers/IAppState';

const mapStateToProps = (state: IAppState): IListStateProps => ({
  ids: selectItemIdsMemoized(state.items.byId),
});

export const List = connect(mapStateToProps)(ListComponent);

