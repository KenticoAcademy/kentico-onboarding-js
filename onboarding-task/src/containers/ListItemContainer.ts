import { connect } from 'react-redux';
import { Dispatch } from '../stores/Dispatch';
import { IAppState } from '../stores/IAppState';
import { ListItem } from '../components/ListItem';
import { enableEditItem, deleteItem, saveChangesToItem, cancelChangesToItem } from '../actionCreators/actionCreators';
import { itemViewModel } from '../models/itemViewModel';
import { IListItemDataProps, IListItemCallbackProps } from '../components/ListItem';

interface IListItemContainerProps {
  itemId: string;
  index: number;
}


const mapStateToProps = (state: IAppState, ownProps: IListItemContainerProps): IListItemDataProps => {
  const id = ownProps.itemId;
  const itemById = state.items.get(id);
  const indexedItem = itemViewModel(itemById, ownProps.index);

  return { item: indexedItem };
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: IListItemContainerProps): IListItemCallbackProps => ({
  onDelete: () => dispatch(deleteItem(ownProps.itemId)),
  onDoubleClick: () => dispatch(enableEditItem(ownProps.itemId)),
  onSave: (text: string) => dispatch(saveChangesToItem(ownProps.itemId, text)),
  onCancel: () => dispatch(cancelChangesToItem(ownProps.itemId)),
});

const ListItemContainer: React.ComponentClass<IListItemContainerProps> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListItem);

export { ListItemContainer as ListItem };
