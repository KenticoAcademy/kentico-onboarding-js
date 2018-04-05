import { ComponentClass } from 'react';
import { connect } from 'react-redux';
import {
  INewItemFormCallbackProps,
  NewItemForm as NewItemFormComponent,
} from '../components/NewItemForm';
import { Dispatch } from 'redux';
import { addItemAsync } from '../actions/thunk';
import { IAppState } from '../models/state/IAppState';

const mapDispatchToProps = (dispatch: Dispatch<IAppState>): INewItemFormCallbackProps => ({
  onSubmit: (text: string) => dispatch(addItemAsync({ text })),
});

export const NewItemForm: ComponentClass = connect(
  null,
  mapDispatchToProps,
)(NewItemFormComponent);
