import * as React from 'react';
import * as PropTypes from 'prop-types';
import { DeleteItemMarker } from '../containers/DeleteItemMarker';
import { ItemId } from '../models/ItemId';
import { OrderedMap } from 'immutable';
import { RecoverMarker } from '../containers/RecoverMarker';
import { RetryMarker } from '../containers/RetryMarker';

export interface  IMarkersDataProps {
  id: ItemId;
  isBeingEdited: boolean;
  isBeingDeleted: boolean;
  synchronized: boolean;
  errorMessages: OrderedMap<string, string>;
}

const Markers: React.StatelessComponent<IMarkersDataProps>
  = ({id, errorMessages, isBeingEdited, isBeingDeleted, synchronized}) => {

  const itemGotError = !(errorMessages.size === 0);
  const isNotEditedOrBeingDeleted = !isBeingEdited && !isBeingDeleted;

  return (
    <span>
      <DeleteItemMarker id={id} />

      {itemGotError && isNotEditedOrBeingDeleted
        ? <RetryMarker id={id} />

        : isBeingDeleted && synchronized
          ? <RecoverMarker id={id} />
          : (null)}
    </span>);
};

Markers.displayName = 'Markers';

Markers.propTypes = {
  id: PropTypes.string.isRequired,
  isBeingEdited: PropTypes.bool.isRequired,
  isBeingDeleted: PropTypes.bool.isRequired,
  synchronized: PropTypes.bool.isRequired,
  errorMessages: PropTypes.object.isRequired,
};

export { Markers };
