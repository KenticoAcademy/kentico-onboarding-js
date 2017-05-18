import { IAppState } from '../reducers/IAppState';
import { connect } from 'react-redux';

import { IListItemCallbacksProps, IListItemDataProps, ListItem } from '../components/ListItem';
import { deleteItem, editItem, toggleItemViewMode } from '../actions/actionCreators';
import { constructMemoizedViewModel } from '../utils/constructViewModel';

interface IListItemContainerProps {
  id: string;
}

const mapStateToProps = (state: IAppState, ownProps: IListItemContainerProps): IListItemDataProps => ({
  itemViewModel: constructMemoizedViewModel(
    state.itemsList.items.get(ownProps.id),
    state.itemsList.flags.get(ownProps.id),
    state.itemsList.order.toIndexedSeq().indexOf(ownProps.id) + 1,
  ),
});

const mapDispatchToProps = (dispatch: Dispatch, ownProps: IListItemContainerProps): IListItemCallbacksProps => ({
  onItemValueEdit: (value: string) => dispatch(editItem(ownProps.id, value)),
  onDelete: () => dispatch(deleteItem(ownProps.id)),
  onViewChange: () => dispatch(toggleItemViewMode(ownProps.id)),
});

const ListItemContainer: React.ComponentClass<IListItemContainerProps>
  = connect(mapStateToProps, mapDispatchToProps)(ListItem);

export { ListItemContainer as ListItem }
