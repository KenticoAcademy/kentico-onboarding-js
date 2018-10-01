import * as React from 'react';
import { connect } from 'react-redux';
import { IState } from '../reducers/IState';
import {
  Item as ItemComponent,
  IItemStateProps,
  IItemDispatchStateProps,
} from '../components/Item';

const mapStateToProps = (state: IState, {id}: IItemStateProps): IItemDispatchStateProps => ({
  isEdited: state.items.get(id).isEdited,
});

export const Item: React.ComponentClass<IItemStateProps> = connect(
  mapStateToProps,
)(ItemComponent);
