import {connect} from 'react-redux';
import {ComponentClass} from 'react';
import {
  IListItemDispatchProps,
  IListItemStateProps,
  ListItem as ListItemComponent,
} from '../../components/Items/ListItem';
import {IAppState} from '../../reducers/IAppState';
import {IAction} from '../../actions/IAction';
import {Dispatch} from 'redux';
import {toggleEditing} from '../../actions/simpleActions/toggleEditing';
import {selectItemMemoized} from '../../selectors/selectItemMemoized';


export interface IListItemContainerProps {
  id: ItemId;
  index: number;
}

const mapStateToProps = (state: IAppState, {id, index}: IListItemContainerProps): IListItemStateProps => {
  const item = state.items.byId.get(id);
  const isSynchronizing = item.isNotSynchronized && item.errorMessages.size === 0;
  const areThereErrors = item.errorMessages.size !== 0;

  return ({
    item: selectItemMemoized(item),
    index,
    isSynchronizing,
    areThereErrors,
  });
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>, {id}: IListItemContainerProps): IListItemDispatchProps => ({
  onClick: () => dispatch(toggleEditing(id)),
});

const mergeProps = (propsFromState: IListItemStateProps, propsFromDispatch: IListItemDispatchProps) => ({
  ...propsFromState,
  ...propsFromDispatch,
});

export const ListItem: ComponentClass<IListItemContainerProps> =
  connect(mapStateToProps, mapDispatchToProps, mergeProps)(ListItemComponent);
