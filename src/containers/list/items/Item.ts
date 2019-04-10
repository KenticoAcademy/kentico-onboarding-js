import { IStore } from '../../../store/types/IStore';
import {
  IItemOwnProps,
  IItemStateProps, Item as ItemComponent,
} from '../../../components/list/items/Item';
import { connect } from 'react-redux';
import { ComponentClass } from 'react';

const mapStateToProps = (state: IStore, ownProps: IItemOwnProps): IItemStateProps => ({
  isEdited: state.items.get(ownProps.id).isEdited,
});

export const Item: ComponentClass<IItemOwnProps> = connect(mapStateToProps)(ItemComponent);
