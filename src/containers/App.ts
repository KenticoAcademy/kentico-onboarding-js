import { App as AppComponent } from '../App';
import { IAppState } from '../reducers/IAppState';
import { connect } from 'react-redux';

const mapStateToProps = (state: IAppState) => ({
  isFetching: state.items.status.isFetching,
  errorMessage: state.items.status.errorMessage,
});

export const App = connect(mapStateToProps)(AppComponent);
