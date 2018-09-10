import * as React from 'react';
import * as PropTypes from 'prop-types';
import { DeleteItemMarker } from '../../containers/Markers/DeleteItemMarker';
import { RecoverMarker } from '../../containers/Markers/RecoverMarker';
import { RetryMarker } from '../../containers/Markers/RetryMarker';
import { Item } from '../../models/Item';

export interface IMarkersDataProps {
  item: Item;
}

const Markers: React.StatelessComponent<IMarkersDataProps> = ({item}) => {
  const {id, errorMessages, isBeingEdited, isBeingDeleted, synchronized} = item;

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
  item: PropTypes.object.isRequired,
};

export { Markers };
