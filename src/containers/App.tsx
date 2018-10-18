import {App as AppComponent, IAppDispatchProps} from '../App';
import {IAppState} from '../reducers/IAppState';
import {connect} from 'react-redux';
import {CreateFetchItems} from '../actions';
import {Dispatch} from 'redux';


const mapDispatchToProps = (dispatch: Dispatch<IAppState>): IAppDispatchProps => ({
  onApplicationLoad: () => dispatch(CreateFetchItems()),
});

export const App = connect(null, mapDispatchToProps)(AppComponent);
