import { connect, Dispatch } from 'react-redux';
import {
  FetchedItems,
  IFetchCallbackProps,
  IFetchDataProps
} from '../../components/todo-list/FetchedItems';
import { fetchItems } from '../../actions/index';
import { IAction } from '../../actions/IAction';
import { IAppState } from '../../models/IAppState';
import { closeFetchError } from '../../actions/actionCreators';

const mapStateToProps = (state: IAppState): IFetchDataProps => ({
  fetchFailed: state.fetchStatus.hasError,
  errorMessage: state.fetchStatus.errorMessage,
});

const mapDispatchToProps = (dispatch: Dispatch<IAppState>): IFetchCallbackProps => ({
  onFetchItems: (): Promise<void | IAction> => dispatch(fetchItems()),
  onFetchErrorClose: (): IAction => dispatch(closeFetchError())
});

const enhancer = connect(mapStateToProps, mapDispatchToProps);
const connectedComponent = enhancer(FetchedItems);

export { connectedComponent as FetchedItems };
