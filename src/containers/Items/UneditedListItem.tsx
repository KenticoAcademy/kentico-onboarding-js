import {
  connect
} from 'react-redux';
import { Dispatch} from 'redux';
import { ComponentClass } from 'react';
import {
  IUneditedListItemCallbackProps,
  IUneditedListItemDataProps,
  UneditedListItem as UneditedListItemComponent
} from '../../components/Items/UneditedListItem';
import { IAppState } from '../../reducers/IAppState';
import { ItemId } from '../../models/ItemId';
import { toggleEditing } from '../../actions/simpleActions/toggleEditing';

interface IUneditedListItemContainerProps {
  itemId: ItemId;
}

const mapStateToProps = (state: IAppState, {itemId}: IUneditedListItemContainerProps): IUneditedListItemDataProps => ({
  item: state.items.byId.get(itemId),
});

const mapDispatchToProps = (dispatch: Dispatch<IAppState>, {itemId}: IUneditedListItemContainerProps): IUneditedListItemCallbackProps => ({
  onClick: () => dispatch(toggleEditing(itemId)),
});

export const UneditedListItem: ComponentClass<IUneditedListItemContainerProps> =
  connect(mapStateToProps, mapDispatchToProps)(UneditedListItemComponent);
