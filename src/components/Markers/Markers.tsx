import * as React from 'react';
import * as PropTypes from 'prop-types';
import { DeleteItemMarker } from '../../containers/Markers/DeleteItemMarker';
import { RecoverMarker } from '../../containers/Markers/RecoverMarker';
import { RetryMarker } from '../../containers/Markers/RetryMarker';
import { typeOfMarkerRendered } from '../../containers/Markers/Markers';

export interface IMarkersStateProps {
  id: ItemId;
  markerType: typeOfMarkerRendered;
}

const getCorrectMarker = (marker: typeOfMarkerRendered, id: ItemId): JSX.Element | undefined => {
  switch (marker) {
    case typeOfMarkerRendered.SHOW_RETRY:
      return <RetryMarker id={id} />;
    case typeOfMarkerRendered.SHOW_RECOVER:
      return <RecoverMarker id={id} />;
    default:
      return;
  }
};

const Markers: React.StatelessComponent<IMarkersStateProps> = ({id, markerType}) => (
  <div className="list__item_content">
    {getCorrectMarker(markerType, id)}
    <DeleteItemMarker id={id} />
  </div>);

Markers.displayName = 'Markers';

Markers.propTypes = {
  id: PropTypes.string.isRequired,
};

export { Markers };
