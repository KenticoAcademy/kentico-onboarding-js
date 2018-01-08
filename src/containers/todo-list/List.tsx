import { connect, Dispatch } from 'react-redux';
import { IListCallbackProps, IListDataProps, List } from '../../components/todo-list/List';
import { IAppState } from '../../models/IAppState';
import { getItemIds } from '../../selectors/getItemIds';
import { IAction } from '../../actions/IAction';
import { insertItem, stopFetching } from '../../actions/actionCreators';
import { Uuid } from '../../utils/generateId';

const mapStateToProps = (state: IAppState): IListDataProps => ({
  ids: getItemIds(state),
  isFetching: state.isFetching,
});

const mapDispatchToProps = (dispatch: Dispatch<IAppState>): IListCallbackProps => ({
  onFetchFinished: (): IAction => dispatch(stopFetching()),
  onAddItem: (text: string, id: Uuid): IAction => dispatch(insertItem(text, id)),
});

const enhancer = connect(mapStateToProps, mapDispatchToProps);
const connectedComponent = enhancer(List);

export { connectedComponent as List };
