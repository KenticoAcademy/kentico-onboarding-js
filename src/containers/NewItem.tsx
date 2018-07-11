import { connect, Dispatch } from 'react-redux';

import {
  NewItem as NewItemComponent,
  INewItemProps,
} from '../components/NewItem';
import { addItem } from '../actions';
import { IState } from '../store/IState';

const mapDispatchToProps = (dispatch: Dispatch<IState>): INewItemProps => ({
    addItem: (itemValue: string) => dispatch(addItem(itemValue)),
  });

export const NewItem: React.ComponentClass
  = connect<undefined, INewItemProps>(undefined, mapDispatchToProps)(NewItemComponent);
