import * as React from 'react';
import { connect } from 'react-redux';
import { postItemThunk } from '../actions/thunkActions/thunkActions';
import {
  NewListItemDispatchProps,
  NewListItem as NewListItemComponent,
} from '../components/NewListItem';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from '../store/state/IAppState';
import { Actions } from '../actions/types/itemsActionTypes';

const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, void, Actions>): NewListItemDispatchProps => ({
  addItem: (text: string) => dispatch(postItemThunk(text)),
});

export const NewListItem: React.ComponentClass = connect(
  null,
  mapDispatchToProps,
)(NewListItemComponent);
