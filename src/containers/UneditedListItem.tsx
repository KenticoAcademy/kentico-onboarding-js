import { connect } from 'react-redux';
import { ComponentClass } from 'react';
import { IUneditedListItemCallbackProps, IUneditedListItemDataProps, UneditedListItem as UneditedListItemComponent } from '../components/UneditedListItem';
import {
  toggleEditing,
} from '../actions/actionCreators';
import { IAppState } from '../stores/IAppState';
import { ItemId } from '../models/ItemId';

interface IUneditedListItemContainerProps {
  itemId: ItemId;
}

const mapStateToProps = (state: IAppState, { itemId }: IUneditedListItemContainerProps): IUneditedListItemDataProps => ({
  itemText: state.items.byId.get(itemId).text,
});

const mapDispatchToProps = (dispatch: Function, { itemId }: IUneditedListItemContainerProps): IUneditedListItemCallbackProps => ({
  onTextClick: () => dispatch(toggleEditing(itemId)),
});

export const UneditedListItem: ComponentClass<IUneditedListItemContainerProps> =
  connect(mapStateToProps, mapDispatchToProps)(UneditedListItemComponent);
