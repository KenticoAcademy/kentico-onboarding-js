import { App as AppComponent } from '../App';
import { IAppState } from '../reducers/IAppState';
import {
  connect,
  Dispatch
} from 'react-redux';

const mapStateToProps = (state: IAppState) => ({
  isFetching: state.items.status.isFetching,
  errorMessage: state.items.status.errorMessage,
});


const mapDispatchToProps = (dispatch: Dispatch<IAppState>) => ({
  dispatch,
});

export const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
