import { connect, Dispatch } from 'react-redux';
import { AddedItem, IAddedItemCallbackProps } from '../../components/todo-list/AddedItem';
import { insertItem } from '../../actions/actionCreators';
import { IAppState } from '../../models/IAppState';
import { IAction } from '../../actions/IAction';

const mapDispatchToProps = (dispatch: Dispatch<IAppState>): IAddedItemCallbackProps => ({
  onAddItem: (text: string): IAction => dispatch(insertItem(text)),
});

const enhancer = connect(undefined, mapDispatchToProps);
const connectedComponent = enhancer(AddedItem);

export { connectedComponent as AddedItem };
