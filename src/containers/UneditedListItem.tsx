import { connect } from 'react-redux';
import { IUneditedListItemCallbackProps, IUneditedListItemDataProps, UneditedListItem as UneditedListItemComponent } from '../components/UneditedListItem';
import {
  toggleEditing,
} from '../actions/actionCreators';
import { IAppState } from '../stores/IAppState';
import { ComponentClass } from 'react';

interface IUneditedListItemContainerProps {
  itemId: string;
}

const mapStateToProps = (state: IAppState, { itemId }: IUneditedListItemContainerProps): IUneditedListItemDataProps => ({
  itemText: state.items.byId.get(itemId).text,
});

const mapDispatchToProps = (dispatch: Function, { itemId }: IUneditedListItemContainerProps): IUneditedListItemCallbackProps => ({
  onTextClick: () => dispatch(toggleEditing(itemId)),
});

export const UneditedListItem: ComponentClass<IUneditedListItemContainerProps> =
  connect(mapStateToProps, mapDispatchToProps)(UneditedListItemComponent);
