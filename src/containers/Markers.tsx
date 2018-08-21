import { connect } from 'react-redux';
import { ComponentClass } from 'react';
import {
  IMarkersDataProps,
  Markers as MarkersComponent
} from '../components/Markers';
import { IAppState } from '../reducers/IAppState';
import { ItemId } from '../models/ItemId';

export interface IMarkersContainerProps {
  id: ItemId;
}

function mapStateToProps(state: IAppState, {id}: IMarkersContainerProps): IMarkersDataProps {
  const item = state.items.byId.get(id);
  return {
    id,
    isBeingEdited: item.isBeingEdited,
    isBeingDeleted: item.isBeingDeleted,
    synchronized: item.synchronized,
    errorMessages: item.errorMessages,
  };
}

export const Markers: ComponentClass<IMarkersContainerProps> = connect(mapStateToProps, null)(MarkersComponent);
