import { ComponentClass } from 'react';
import { connect } from 'react-redux';
import {
  INewItemFormCallbackProps,
  NewItemForm as NewItemFormComponent,
} from '../components/NewItemForm';
import { Dispatch } from 'redux';
import { IAction } from '../models/interfaces/IAction';
import { postItemAsync } from '../actions/thunk';

const mapDispatchToProps = (dispatch: Dispatch<IAction>): INewItemFormCallbackProps => ({
  onSubmit: (uri: string, text: string) =>
    postItemAsync(
      uri,
      text,
    )(dispatch),
});

export const NewItemForm: ComponentClass = connect(
  null,
  mapDispatchToProps,
)(NewItemFormComponent);
