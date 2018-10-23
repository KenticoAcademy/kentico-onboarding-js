import { connect } from 'react-redux';
import { IItemStateProps, Item as ItemComponent } from '../components/Item';
import { IStore } from '../store/IAppState';
import { ComponentClass } from 'react';

interface IItemContainerProps {
  readonly id: Uuid;
  readonly index: number;
}

const mapStateToProps = (state: IStore, ownProps: IItemContainerProps): IItemStateProps => ({
  isInEditMode: state.todoList.items.get(ownProps.id).isInEditMode,
  ...ownProps,
});

export const Item: ComponentClass<IItemContainerProps> = connect(mapStateToProps)(ItemComponent);
