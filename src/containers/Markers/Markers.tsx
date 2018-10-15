import { connect } from 'react-redux';
import { ComponentClass } from 'react';
import {
  IMarkersStateProps,
  Markers as MarkersComponent
} from '../../components/Markers/Markers';
import { IAppState } from '../../reducers/IAppState';
import { ItemId } from '../../models/ItemId';

export enum typeOfMarkerRendered {
  NONE = 'NONE',
  SHOW_RETRY = 'SHOW_RETRY',
  SHOW_RECOVER = 'SHOW_RECOVER',
}

export interface IMarkersContainerProps {
  id: ItemId;
}

const mapStateToProps = (state: IAppState, {id}: IMarkersContainerProps): IMarkersStateProps => {
  const item = state.items.byId.get(id);
  let markerShown = typeOfMarkerRendered.NONE;

  const itemGotError = !(item.errorMessages.size === 0);
  const isNotEditedOrBeingDeleted = !item.isBeingEdited && !item.isBeingDeleted;

  if (itemGotError && isNotEditedOrBeingDeleted) {
    markerShown = typeOfMarkerRendered.SHOW_RETRY;
  } else if (item.isBeingDeleted && item.synchronized) {
    markerShown = typeOfMarkerRendered.SHOW_RECOVER;
  }

  return ({
    id: item.id,
    marker: markerShown,
  });
};

export const Markers: ComponentClass<IMarkersContainerProps> = connect(mapStateToProps)(MarkersComponent);
