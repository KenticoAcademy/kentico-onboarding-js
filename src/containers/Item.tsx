import * as React from 'react';
import { connect } from 'react-redux';
import { IState } from '../reducers/IState';
import {
  Item as ItemComponent,
  IItemOwnProps,
  IItemDispatchStateProps,
} from '../components/Item';

const mapStateToProps = (state: IState, { id }: IItemOwnProps): IItemDispatchStateProps => ({
  isEdited: state.items.get(id).isEdited,
});

export const Item: React.ComponentClass<IItemOwnProps> = connect(
  mapStateToProps,
)(ItemComponent);
