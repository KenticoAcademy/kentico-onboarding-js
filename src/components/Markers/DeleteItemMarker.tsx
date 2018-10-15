import * as React from 'react';
import * as PropTypes from 'prop-types';
import { alertTypes } from '../../constants/alert/alertTypes';
import { alertMessages } from '../../constants/alert/alertMessages';
import {IAction} from '../../actions/IAction';

export interface IDeleteItemMarkerDispatchProps {
  onThrowAway: () => Promise<IAction>;
  assertAlert: (type: alertTypes, message: alertMessages) => number;
}

const DeleteItemMarker: React.StatelessComponent<IDeleteItemMarkerDispatchProps> = ({onThrowAway, assertAlert}) => {

  const _onSharkClick = () => {
    onThrowAway()
      .then(() => assertAlert(alertTypes.SUCCESS, alertMessages.DELETION_SUCCESS))
      .catch(() => assertAlert(alertTypes.ERROR, alertMessages.DELETION_ERROR));
  };

  return (
    <div
      data-balloon={'Let this shark eat this item'}
      data-balloon-pos="up"
      className="list__item__inline_content"
      onClick={_onSharkClick}>
      🦈
    </div>);
};


DeleteItemMarker.displayName = 'DeleteItemMarker';

DeleteItemMarker.propTypes = {
  onThrowAway: PropTypes.func.isRequired,
};

export { DeleteItemMarker };
