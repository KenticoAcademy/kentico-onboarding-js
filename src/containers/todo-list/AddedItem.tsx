import { connect, Dispatch } from 'react-redux';
import { AddedItem, IAddedItemCallbackProps } from '../../components/todo-list/AddedItem';
import { optimisticAdd } from '../../actions/index';
import { IAppState } from '../../models/IAppState';
import { IAction } from '../../actions/IAction';

const mapDispatchToProps = (dispatch: Dispatch<IAppState>): IAddedItemCallbackProps => ({
  onAddItem: (text: string): Promise<void | IAction> => dispatch(optimisticAdd(text)),
});

const enhancer = connect(undefined, mapDispatchToProps);
const connectedComponent = enhancer(AddedItem);

export { connectedComponent as AddedItem };
