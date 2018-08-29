import {
  App as AppComponent,
  IAppCallbackProps
} from '../App';
import { IAppState } from '../reducers/IAppState';
import {
  connect,
  Dispatch
} from 'react-redux';
import { fetchItems } from '../actions';

const mapStateToProps = (state: IAppState) => ({
  isFetching: state.items.status.isFetching,
  errorMessage: state.items.status.errorMessage,
});

const mapDispatchToProps = (dispatch: Dispatch<IAppState>): IAppCallbackProps => ({
  fetchItemsCall: () => fetchItems(dispatch)(),
});

export const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
