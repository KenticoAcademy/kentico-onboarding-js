import {connect} from 'react-redux';
import {ComponentClass} from 'react';
import {
  IUneditedListItemStateProps, UneditedListItem as UneditedListItemComponent,
} from '../../components/Items/UneditedListItem';
import {IAppState} from '../../reducers/IAppState';
import {selectItemMemoized} from '../../selectors/selectItemMemoized';


interface IUneditedListItemContainerProps {
  itemId: ItemId;
}

const mapStateToProps = (state: IAppState, {itemId}: IUneditedListItemContainerProps): IUneditedListItemStateProps => ({
  item: selectItemMemoized(state.items.byId.get(itemId)),
});

export const UneditedListItem: ComponentClass<IUneditedListItemContainerProps> =
  connect(mapStateToProps, null)(UneditedListItemComponent);
