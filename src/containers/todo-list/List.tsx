import { connect, Dispatch } from 'react-redux';
import { IListCallbackProps, IListDataProps, List } from '../../components/todo-list/List';
import { IAppState } from '../../models/IAppState';
import { getItemIds } from '../../selectors/getItemIds';
import { fetchItems } from '../../actions/index';
import { IAction } from '../../actions/IAction';

const mapStateToProps = (state: IAppState): IListDataProps => ({
  ids: getItemIds(state),
  fetchFailed: state.fetchStatus.hasError,
});

const mapDispatchToProps = (dispatch: Dispatch<IAppState>): IListCallbackProps => ({
  onFetchItems: (): Promise<void | IAction> => dispatch(fetchItems()),
});

const enhancer = connect(mapStateToProps, mapDispatchToProps);
const connectedComponent = enhancer(List);

export { connectedComponent as List };
