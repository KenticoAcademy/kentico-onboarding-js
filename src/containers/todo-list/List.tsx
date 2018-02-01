import { connect, Dispatch } from 'react-redux';
import { IListCallbackProps, IListDataProps, List } from '../../components/todo-list/List';
import { IAppState } from '../../models/IAppState';
import { getItemIds } from '../../selectors/getItemIds';
import { fetchItems } from '../../actions/index';
import { IAction } from '../../actions/IAction';

const mapStateToProps = (state: IAppState): IListDataProps => ({
  ids: getItemIds(state),
  isFetching: state.fetchStatus.isFetching,
  hasError: state.fetchStatus.hasError,
  postError: state.postStatus.hasError,
  postErrorMessage: state.postStatus.errorMessage,
  errorMessage: state.fetchStatus.errorMessage,
  putError: state.putStatus.hasError,
  putErrorMessage: state.putStatus.errorMessage,
  deleteError: state.deleteStatus.hasError,
  deleteErrorMessage: state.deleteStatus.errorMessage
});

const mapDispatchToProps = (dispatch: Dispatch<IAppState>): IListCallbackProps => ({
  onFetchItems: (): Promise<void | IAction> => dispatch(fetchItems()),
});

const enhancer = connect(mapStateToProps, mapDispatchToProps);
const connectedComponent = enhancer(List);

export { connectedComponent as List };
