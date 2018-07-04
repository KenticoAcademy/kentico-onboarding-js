import { connect } from 'react-redux';
import { ComponentClass } from 'react';
import {
  IUneditedListItemCallbackProps,
  IUneditedListItemDataProps,
  UneditedListItem as UneditedListItemComponent
} from '../components/UneditedListItem';
import { IAppState } from '../reducers/IAppState';
import {
  removeItem,
  updateItem
} from '../actions';
import { ItemId } from '../models/ItemId';

interface IUneditedListItemContainerProps {
  itemId: ItemId;
  text: string;
}

const mapStateToProps = (state: IAppState, {itemId}: IUneditedListItemContainerProps): IUneditedListItemDataProps => ({
  item: state.items.byId.get(itemId),
});

const mapDispatchToProps = (dispatch: Function, {itemId, text}: IUneditedListItemContainerProps): IUneditedListItemCallbackProps => ({
  onThrowAway: () => removeItem(dispatch)(itemId),
  onSaveAgain: () => updateItem(dispatch)(itemId, text),
});

export const UneditedListItem: ComponentClass<IUneditedListItemContainerProps> =
  connect(mapStateToProps, mapDispatchToProps)(UneditedListItemComponent);
