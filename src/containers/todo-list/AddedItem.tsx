import { connect, Dispatch } from 'react-redux';
import { AddedItem, IAddedItemCallbackProps } from '../../components/todo-list/AddedItem';
import { postItem } from '../../actions/actionCreators';
import { IAppState } from '../../models/IAppState';

const mapDispatchToProps = (dispatch: Dispatch<IAppState>): IAddedItemCallbackProps => ({
  onAddItem: (text: string): void => dispatch(postItem(text)),
});

const enhancer = connect(undefined, mapDispatchToProps);
const connectedComponent = enhancer(AddedItem);

export { connectedComponent as AddedItem };
