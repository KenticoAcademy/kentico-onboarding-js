import { ItemId } from '../../models/ItemId';
import { IAppState } from '../../reducers/IAppState';
import {
  IItemErrorMessageDataProps,
  ItemErrorMessage as ItemErrorMessageComponent
} from '../../components/Items/ItemErrorMessage';
import { ComponentClass } from 'react';
import { connect } from 'react-redux';


interface IItemErrorMessageContainerProps {
  itemId: ItemId;
}

const mapStateToProps = (state: IAppState, {itemId}: IItemErrorMessageContainerProps): IItemErrorMessageDataProps => ({
  errorMessages: state.items.byId.get(itemId).errorMessages,
});

export const ItemErrorMessage: ComponentClass<IItemErrorMessageContainerProps> =
  connect(mapStateToProps)(ItemErrorMessageComponent);
