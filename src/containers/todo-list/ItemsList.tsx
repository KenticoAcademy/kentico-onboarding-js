import { connect, Dispatch } from 'react-redux';
import {
  IListCallbackProps,
  IListDataProps,
  ItemsList
} from '../../components/todo-list/ItemsList';
import { IAppState } from '../../models/IAppState';
import { getItemIds } from '../../selectors/getItemIds';
import { IAction } from '../../actions/IAction';
import { closePostError } from '../../actions/actionCreators';

const mapStateToProps = (state: IAppState): IListDataProps => ({
  ids: getItemIds(state),
  postError: state.postStatus.hasError,
  message: state.postStatus.message
});

const mapDispatchToProps = (dispatch: Dispatch<IAppState>): IListCallbackProps => ({
  onPostErrorClose: (): IAction => dispatch(closePostError())
});

const enhancer = connect(mapStateToProps, mapDispatchToProps);
const connectedComponent = enhancer(ItemsList);

export { connectedComponent as ItemsList };
