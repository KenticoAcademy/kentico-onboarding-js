import { connect } from 'react-redux';
import {
  INewItemDispatchProps,
  NewItem as NewItemComponent,
} from '../../../components/list/items/NewItem';
import { ComponentClass } from 'react';
import { postItem } from '../../../actions/listActions';
import { Dispatch } from '../../../actions/types/Dispatcher';

const mapDispatchToProps = (dispatch: Dispatch): INewItemDispatchProps => ({
  addItem: (text: string) => dispatch(postItem(text)),
});

export const NewItem: ComponentClass = connect(
  null,
  mapDispatchToProps,
)(NewItemComponent);
