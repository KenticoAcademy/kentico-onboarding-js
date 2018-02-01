import { connect } from 'react-redux';
import { App, IAppDataProps } from '../App';
import { IAppState } from '../models/IAppState';

const mapStateToProps = (state: IAppState): IAppDataProps => ({
  isFetching: state.fetchStatus.isFetching,
});

const enhancer = connect(mapStateToProps);
const connectedComponent = enhancer(App);

export { connectedComponent as App };
