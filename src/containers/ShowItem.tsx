import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IState } from '../reducers/IState';
import {
  ShowItem as ShowItemComponent,
  IShowItemOwnProps,
  IShowItemStateProps,
  IShowItemDispatchStateProps,
} from '../components/ShowItem';
import { startEditItem } from '../actions';

const mapStateToProps = (state: IState, { id }: IShowItemOwnProps): IShowItemStateProps => ({
  text: state.list.items.get(id).text,
});

const mapDispatchToProps = (dispatch: Dispatch, { id }: IShowItemOwnProps): IShowItemDispatchStateProps => ({
  onEditStart: () => dispatch(startEditItem(id)),
});

export const ShowItem: React.ComponentClass<IShowItemOwnProps> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShowItemComponent);
