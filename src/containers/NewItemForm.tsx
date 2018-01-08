import { ComponentClass } from 'react';
import { connect } from 'react-redux';
import {
  INewItemFormCallbackProps,
  NewItemForm as NewItemFormComponent
} from '../components/NewItemForm';
import { Dispatch } from 'redux';
import { IAction } from '../models/IAction';
import { postItem } from '../actions/thunk';

const mapDispatchToProps = (dispatch: Dispatch<IAction>): INewItemFormCallbackProps => ({
  onSubmit: (uri: string, text: string) =>
    postItem(
      uri,
      text,
    )(dispatch),
});

export const NewItemForm: ComponentClass = connect(
  null,
  mapDispatchToProps,
)(NewItemFormComponent);
