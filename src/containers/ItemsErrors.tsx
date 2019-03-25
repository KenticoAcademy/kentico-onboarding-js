import * as React from 'react';
import { connect } from 'react-redux';
import {
  ItemsErrors as ItemsErrorsComponent,
  IItemsErrorsStateProps,
  IItemsErrorsDispatchProps
} from '../components/ItemsErrors';
import { IAppState } from '../reducers/interfaces/IAppState';
import { Dispatch } from 'redux';
import {
  setItemErrorWasRendered,
} from '../actions/ListActions';

const mapStateToProps = ({ list }: IAppState): IItemsErrorsStateProps => ({
  itemsErrors: list.itemsErrors.toArray()
});

const mapDispatchToProps = (dispatch: Dispatch): IItemsErrorsDispatchProps => ({
  onItemErrorPopupWasRendered: (id: Uuid) => dispatch(setItemErrorWasRendered(id)),
});

export const ItemsErrors: React.ComponentClass = connect(mapStateToProps, mapDispatchToProps)(ItemsErrorsComponent);
