import { connect } from 'react-redux';
import { IAppState } from '../models/IAppState';
import { App, IAppDataProps } from '../components/App';

const mapStateToProps = (state: IAppState): IAppDataProps => ({
  isFetching: state.fetchStatus.isFetching,
});

const enhancer = connect(mapStateToProps);
const connectedComponent = enhancer(App);

export { connectedComponent as App };
