import { ComponentClass } from 'react';
import { connect } from 'react-redux';
import {
  INewItemFormCallbackProps,
  NewItemForm as NewItemFormComponent,
} from '../components/NewItemForm';
import { Dispatch } from 'redux';
import { postItemAsync } from '../actions/thunk';
import { IAppState } from '../models/interfaces/IAppState';

const mapDispatchToProps = (dispatch: Dispatch<IAppState>): INewItemFormCallbackProps => ({
  onSubmit: (text: string, uri: string) =>
    dispatch(
      postItemAsync({
        uri,
        text,
      })),
});

export const NewItemForm: ComponentClass = connect(
  null,
  mapDispatchToProps,
)(NewItemFormComponent);
