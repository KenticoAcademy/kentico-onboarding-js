import { connect } from 'react-redux';
import { ComponentClass } from 'react';
import {
  IMarkersStateProps,
  Markers as MarkersComponent
} from '../../components/Markers/Markers';
import { IAppState } from '../../reducers/IAppState';
import {IItem} from '../../models/Item';

export enum typeOfMarkerRendered {
  NONE = 'NONE',
  SHOW_RETRY = 'SHOW_RETRY',
  SHOW_RECOVER = 'SHOW_RECOVER',
}

export interface IMarkersContainerProps {
  id: ItemId;
}

function getMarkerType(itemGotError: boolean, isNotEditedOrBeingDeleted: boolean, item: IItem): typeOfMarkerRendered {
  if (itemGotError && isNotEditedOrBeingDeleted) {
    return typeOfMarkerRendered.SHOW_RETRY;
  }
  if (item.isBeingDeleted && !item.isNotSynchronized) {
    return typeOfMarkerRendered.SHOW_RECOVER;
  }
  return typeOfMarkerRendered.NONE;
}

const mapStateToProps = (state: IAppState, {id}: IMarkersContainerProps): IMarkersStateProps => {
  const item = state.items.byId.get(id);

  const itemGotError = !(item.errorMessages.size === 0);
  const isNotEditedOrBeingDeleted = !item.isBeingEdited && !item.isBeingDeleted;

  return ({
    id: item.id,
    markerType: getMarkerType(itemGotError, isNotEditedOrBeingDeleted, item),
  });
};

export const Markers: ComponentClass<IMarkersContainerProps> = connect(mapStateToProps)(MarkersComponent);
