import * as React from 'react';
import * as PropTypes from 'prop-types';
import { IAction } from '../actions/IAction';

interface  IDeleteItemMarkerDataProps {
  onThrowAway: () => Promise<IAction>;
}

const DeleteItemMarker: React.StatelessComponent<IDeleteItemMarkerDataProps> = ({onThrowAway}) => {

  function _onThrowAway(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    onThrowAway();
  }

  return (
    <div
      data-balloon={'Let this shark eat this item'}
      data-balloon-pos="up"
      className="uneditedItemMessage"
      onClick={_onThrowAway}>
      🦈
    </div>);
};


DeleteItemMarker.displayName = 'DeleteItemMarker';

DeleteItemMarker.propTypes = {
  onThrowAway: PropTypes.func.isRequired,
};

export { DeleteItemMarker };
