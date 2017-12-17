import { connect } from 'react-redux';
import { List as ListComponent } from '../components/List';
import { selectItemIdsMemoized } from '../selectors/selectItemIdsMemoized';
import { IAppState } from '../stores/IAppState';


const mapStateToProps = (state: IAppState) => {
  return {
    ids: selectItemIdsMemoized(state.items.byId),
  };
};

export const List = connect(mapStateToProps)(ListComponent);

