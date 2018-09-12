import {
  App as AppComponent,
  IAppCallbackProps
} from '../App';
import { IAppState } from '../reducers/IAppState';
import {
  connect
} from 'react-redux';
import { CreateFetchItems } from '../actions';
import { Dispatch} from 'redux';

const mapStateToProps = (state: IAppState) => ({
  isFetching: state.items.status.isFetching,
  errorMessage: state.items.status.errorMessage,
});

const mapDispatchToProps = (dispatch: Dispatch<IAppState>): IAppCallbackProps => ({
  fetchItemsCall: () => dispatch(CreateFetchItems()),
});

export const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
