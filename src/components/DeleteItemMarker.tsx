import * as React from 'react';
import * as PropTypes from 'prop-types';
import { IAction } from '../actions/IAction';

interface IDeleteItemMarkerDataProps {
  onThrowAway: () => Promise<IAction>;
}

const DeleteItemMarker: React.StatelessComponent<IDeleteItemMarkerDataProps> = ({onThrowAway}) => {

  return (
    <div
      data-balloon={'Let this shark eat this item'}
      data-balloon-pos="up"
      className="uneditedItemMessage"
      onClick={onThrowAway}>
      🦈
    </div>);
};


DeleteItemMarker.displayName = 'DeleteItemMarker';

DeleteItemMarker.propTypes = {
  onThrowAway: PropTypes.func.isRequired,
};

export { DeleteItemMarker };
