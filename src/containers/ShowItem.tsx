import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IState } from '../reducers/IState';
import {
  ShowItem as ShowItemComponent,
  IShowItemProps,
  IShowItemStateProps,
  IShowItemDispatchStateProps,
} from '../components/ShowItem';
import { startEditItem } from '../actions';

interface IOwnProps {
  id: Guid;
}

const mapStateToProps = (state: IState, {id}: IOwnProps): IShowItemStateProps => ({
  text: state.items.get(id).text,
});

const mapDispatchToProps = (dispatch: Dispatch, {id}: IOwnProps): IShowItemDispatchStateProps => ({
  onEditStart: () => dispatch(startEditItem(id)),
});

export const ShowItem: React.ComponentClass<IShowItemProps> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShowItemComponent);
