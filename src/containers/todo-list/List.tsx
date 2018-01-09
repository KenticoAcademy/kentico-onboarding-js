import { connect, Dispatch } from 'react-redux';
import { IListCallbackProps, IListDataProps, List } from '../../components/todo-list/List';
import { IAppState } from '../../models/IAppState';
import { getItemIds } from '../../selectors/getItemIds';
import { IAction } from '../../actions/IAction';
import { fetchItems, insertItem} from '../../actions/actionCreators';
import { Uuid } from '../../utils/generateId';

const mapStateToProps = (state: IAppState): IListDataProps => ({
  ids: getItemIds(state),
  isFetching: state.fetchStatus.isFetching,
  hasError: state.fetchStatus.hasError,
  errorMessage: state.fetchStatus.errorMessage
});

const mapDispatchToProps = (dispatch: Dispatch<IAppState>): IListCallbackProps => ({
  onFetchItems: (): void => dispatch(fetchItems()),
  onAddItem: (text: string, id: Uuid): IAction => dispatch(insertItem(text, id)),
});

const enhancer = connect(mapStateToProps, mapDispatchToProps);
const connectedComponent = enhancer(List);

export { connectedComponent as List };
