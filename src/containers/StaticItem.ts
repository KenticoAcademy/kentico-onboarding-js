import { connect } from 'react-redux';
import {
  IStaticItemDispatchProps,
  IStaticItemStateProps,
  StaticItem as StaticItemComponent,
} from '../components/StaticItem';
import { startItemEditing } from '../actions';
import { IAction } from '../actions/IAction';
import { Dispatch } from 'redux';
import { IStore } from '../store/IAppState';
import { ComponentClass } from 'react';

interface IStaticItemContainerProps {
  readonly id: Uuid;
  readonly index: number;
}

const mapStateToProps = (state: IStore, ownProps: IStaticItemContainerProps): IStaticItemStateProps => ({
  item: state.todoList.items.get(ownProps.id),
  index: ownProps.index,
});

const mapDispatchToProps = (dispatch: Dispatch<IAction>, ownProps: IStaticItemContainerProps): IStaticItemDispatchProps => ({
  onItemClick: () => dispatch(startItemEditing(ownProps.id)),
});

export const StaticItem: ComponentClass<IStaticItemContainerProps> = connect(mapStateToProps, mapDispatchToProps)(StaticItemComponent);
