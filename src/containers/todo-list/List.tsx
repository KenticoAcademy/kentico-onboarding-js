import { connect, Dispatch } from 'react-redux';
import { IListCallbackProps, IListDataProps, List } from '../../components/todo-list/List';
import { IAppState } from '../../models/IAppState';
import { getItemIds } from '../../selectors/getItemIds';
import { IAction } from '../../actions/IAction';
import { stopFetching } from '../../actions/actionCreators';

const mapStateToProps = (state: IAppState): IListDataProps => ({
  ids: getItemIds(state),
  isFetching: state.isFetching,
});

const mapDispatchToProps = (dispatch: Dispatch<IAppState>): IListCallbackProps => ({
  onFetchFinished: (): IAction => dispatch(stopFetching()),
});

const enhancer = connect(mapStateToProps, mapDispatchToProps);
const connectedComponent = enhancer(List);

export { connectedComponent as List };
