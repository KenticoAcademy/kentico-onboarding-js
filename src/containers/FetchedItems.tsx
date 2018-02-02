import { connect, Dispatch } from 'react-redux';
import {
  Fetch,
  IFetchCallbackProps,
  IFetchDataProps
} from '../components/FetchedItems';
import { fetchItems } from '../actions/index';
import { IAction } from '../actions/IAction';
import { IAppState } from '../models/IAppState';

const mapStateToProps = (state: IAppState): IFetchDataProps => ({
  fetchFailed: state.fetchStatus.hasError,
});

const mapDispatchToProps = (dispatch: Dispatch<IAppState>): IFetchCallbackProps => ({
  onFetchItems: (): Promise<void | IAction> => dispatch(fetchItems()),
});

const enhancer = connect(mapStateToProps, mapDispatchToProps);
const connectedComponent = enhancer(Fetch);

export { connectedComponent as Fetch };
