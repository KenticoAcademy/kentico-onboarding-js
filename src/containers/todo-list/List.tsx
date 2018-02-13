import { connect, Dispatch } from 'react-redux';
import { IListCallbackProps, IListDataProps, List } from '../../components/todo-list/List';
import { IAppState } from '../../models/IAppState';
import { getItemIds } from '../../selectors/getItemIds';
import { IAction } from '../../actions/IAction';
import { closePostError } from '../../actions/actionCreators';

const mapStateToProps = (state: IAppState): IListDataProps => ({
  ids: getItemIds(state),
  postError: state.postStatus.hasError,
  errorMessage: state.postStatus.errorMessage
});

const mapDispatchToProps = (dispatch: Dispatch<IAppState>): IListCallbackProps => ({
  onPostErrorClose: (): IAction => dispatch(closePostError())
});

const enhancer = connect(mapStateToProps, mapDispatchToProps);
const connectedComponent = enhancer(List);

export { connectedComponent as List };
