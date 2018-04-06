import { connect, Dispatch } from 'react-redux';

import {
  NewItem as NewItemComponent,
  INewItemProps,
} from '../components/NewItem';
import { addItem } from '../actions';
import { IState } from '../store/IState';

const mapDispatchToProps =
  (dispatch: Dispatch<IState>): INewItemProps => ({
    addItem: (itemValue: string) => dispatch(addItem(itemValue)),
  });

export const NewItem = connect(null, mapDispatchToProps)(NewItemComponent);
