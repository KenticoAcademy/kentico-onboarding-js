import * as React from 'react';
import * as PropTypes from 'prop-types';
import { DeleteItemMarker } from '../../containers/Markers/DeleteItemMarker';
import { RecoverMarker } from '../../containers/Markers/RecoverMarker';
import { RetryMarker } from '../../containers/Markers/RetryMarker';
import { Item } from '../../models/Item';
import { typeOfMarkerRendered } from '../../containers/Markers/Markers';
import { ItemId } from '../../models/ItemId';

export interface IMarkersDataProps {
  item: Item;
  marker: typeOfMarkerRendered;
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

const Markers: React.StatelessComponent<IMarkersDataProps> = ({item, marker}) => {
  const {id} = item;

  return (
    <div className="list__item_content">
      {getCorrectMarker(marker, id)}
      <DeleteItemMarker id={id} />
    </div>);
};

Markers.displayName = 'Markers';

Markers.propTypes = {
  item: PropTypes.object.isRequired,
};

export { Markers };
