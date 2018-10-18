import { IAppState } from '../../reducers/IAppState';
import {
  IItemErrorMessageStateProps,
  ItemErrorMessage as ItemErrorMessageComponent
} from '../../components/Items/ItemErrorMessage';
import { ComponentClass } from 'react';
import { connect } from 'react-redux';
import {selectErrorsMemoized} from '../../selectors/selectErrorsMemoized';


interface IItemErrorMessageContainerProps {
  itemId: ItemId;
}

const mapStateToProps = (state: IAppState, {itemId}: IItemErrorMessageContainerProps): IItemErrorMessageStateProps => ({
  errorMessages: selectErrorsMemoized(state.items.byId.get(itemId).errorMessages),
});

export const ItemErrorMessage: ComponentClass<IItemErrorMessageContainerProps> =
  connect(mapStateToProps)(ItemErrorMessageComponent);
