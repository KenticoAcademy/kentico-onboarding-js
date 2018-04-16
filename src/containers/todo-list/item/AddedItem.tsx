import { connect, Dispatch } from 'react-redux';
import {
  AddedItem,
  IAddedItemCallbackProps
} from '../../../components/todo-list/item/AddedItem';
import { postItem } from '../../../actions';
import { IAppState } from '../../../models/IAppState';

const mapDispatchToProps = (dispatch: Dispatch<IAppState>): IAddedItemCallbackProps => ({
  onAddItem: (text: string) => dispatch(postItem(text)),
});

const connectedComponent = connect(undefined, mapDispatchToProps)(AddedItem);

export { connectedComponent as AddedItem };
