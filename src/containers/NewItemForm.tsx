import { connect } from 'react-redux';
import {
  INewItemFormCallbackProps,
  NewItemForm as NewItemFormComponent
} from '../components/NewItemForm';
import { addNewItem } from '../actions';
import { Dispatch } from 'redux';
import { IAction } from '../models/IAction';

const mapDispatchToProps = (dispatch: Dispatch<IAction>): INewItemFormCallbackProps => ({
  onSubmit: (text: string) =>
    dispatch(addNewItem(
      text,
    )),
});

export const NewItemForm = connect(
  null,
  mapDispatchToProps,
)(NewItemFormComponent);
