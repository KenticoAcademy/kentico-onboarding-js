import { IAppState } from '../stores/IAppState';
import { connect } from 'react-redux';
import * as memoizee from 'memoizee';

import { IListItemCallbacksProps, IListItemDataProps, ListItem } from '../components/ListItem';
import { Dispatch } from '../stores/Dispatch';
import { deleteItem, editItem, toggleItemViewMode } from '../actions/actionCreators';
import { IItemViewModel } from '../models/IItemViewModel';
import { Item } from '../models/Item';
import { ItemFlags } from '../models/ItemFlags';

interface IListItemContainerProps {
  id: string;
}

function constructViewModel(item: Item, flags: ItemFlags, index: number): IItemViewModel {
  return {
    id: item.id,
    value: item.value,
    isInEditMode: flags.editMode,
    isSavedInDatabase: flags.isSavedInDatabase,
    index,
  }
}

const constructViewModelMemoized = memoizee(constructViewModel);

function mapStateToProps(state: IAppState, ownProps: IListItemContainerProps): IListItemDataProps {
  const item = state.items.get(ownProps.id);
  const index = state.itemsOrder.toIndexedSeq().indexOf(ownProps.id) + 1;
  const flags = state.itemsFlags.get(ownProps.id);

  return {
    itemViewModel: constructViewModelMemoized(item, flags, index),
  };
}

function mapDispatchToProps(dispatch: Dispatch, ownProps: IListItemContainerProps): IListItemCallbacksProps {
  return {
    onItemValueEdit: (value: string) => dispatch(editItem(ownProps.id, value)),
    onDelete: () => dispatch(deleteItem(ownProps.id)),
    onViewChange: () => dispatch(toggleItemViewMode(ownProps.id)),
  };
}

const ListItemContainer: React.ComponentClass<IListItemContainerProps> = connect(mapStateToProps, mapDispatchToProps)(ListItem);

export { ListItemContainer as ListItem, constructViewModel }
