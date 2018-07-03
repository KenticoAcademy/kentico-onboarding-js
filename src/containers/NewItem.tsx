import { connect, Dispatch } from 'react-redux';

import {
  NewItem as NewItemComponent,
  INewItemProps,
  INewItemState,
} from '../components/NewItem';
import { addItem } from '../actions';
import { IAction } from '../actions/types/IAction';

const mapDispatchToProps =
  (dispatch: Dispatch<IAction>): INewItemProps => ({
    addItem: (itemValue: string) => dispatch(addItem(itemValue)),
  });

export const NewItem: React.ComponentClass
  = connect<INewItemState, INewItemProps>(undefined, mapDispatchToProps)(NewItemComponent);
