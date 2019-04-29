import * as React from 'react';
import { connect } from 'react-redux';

import {
  AddItem as AddItemComponent,
  IAddItemDispatchProps,
  IAddItemStateProps
} from '../components/AddItem';
import { ThunkDispatch } from 'redux-thunk';
import { requestAddItem, setNewItemErrorWasRendered } from '../actions/ListActions';
import { IAppState } from '../reducers/interfaces/IAppState';
import { IAction } from '../actions/IAction';

const mapStateToProps = ({ list }: IAppState): IAddItemStateProps => ({
  properties: list.newItem
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, never, IAction>): IAddItemDispatchProps => ({
  onAddItem: (text: string) => dispatch(requestAddItem(text)),
  onNewItemErrorPopupWasRendered: () => dispatch(setNewItemErrorWasRendered())
});

export const AddItem: React.ComponentClass = connect(mapStateToProps, mapDispatchToProps)(AddItemComponent);
