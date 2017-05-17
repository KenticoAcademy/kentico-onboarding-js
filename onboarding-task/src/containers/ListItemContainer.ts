import { IAppState } from '../stores/IAppState';
import { connect } from 'react-redux';
import * as memoizee from 'memoizee';

import { IListItemCallbacksProps, IListItemDataProps, ListItem } from '../components/ListItem';
import { deleteItem, editItem, toggleItemViewMode } from '../actions/actionCreators';
import { IItemViewModel } from '../models/IItemViewModel';
import { Item } from '../models/Item';
import { ItemFlags } from '../models/ItemFlags';
import { Dispatch } from '../@types/global';

interface IListItemContainerProps {
  id: string;
}

const constructViewModel = (item: Item, flags: ItemFlags, index: number): IItemViewModel => ({
  id: item.id,
  value: item.value,
  isInEditMode: flags.editMode,
  isSavedInDatabase: flags.isSavedInDatabase,
  index,
});


const constructMemoizedViewModel = memoizee(constructViewModel);

const mapStateToProps = (state: IAppState, ownProps: IListItemContainerProps): IListItemDataProps => ({
  itemViewModel: constructMemoizedViewModel(
    state.items.get(ownProps.id),
    state.itemsFlags.get(ownProps.id),
    state.itemsOrder.toIndexedSeq().indexOf(ownProps.id) + 1,
  ),
});

const mapDispatchToProps = (dispatch: Dispatch, ownProps: IListItemContainerProps): IListItemCallbacksProps => ({
  onItemValueEdit: (value: string) => dispatch(editItem(ownProps.id, value)),
  onDelete: () => dispatch(deleteItem(ownProps.id)),
  onViewChange: () => dispatch(toggleItemViewMode(ownProps.id)),
});

const ListItemContainer: React.ComponentClass<IListItemContainerProps> = connect(mapStateToProps, mapDispatchToProps)(ListItem);

export { ListItemContainer as ListItem, constructViewModel }
