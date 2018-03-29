import { connect, Dispatch } from 'react-redux';

import {
  NewItem as NewItemComponent,
  INewItemProps,
} from '../components/NewItem';
import { addItem } from '../actions';
import { IAction } from '../@types/IAction';

const mapDispatchToProps =
  (dispatch: Dispatch<IAction>): INewItemProps => ({
    addItem: (itemValue: string) => dispatch(addItem(itemValue)),
  });

export const NewItem = connect(null, mapDispatchToProps)(NewItemComponent);
