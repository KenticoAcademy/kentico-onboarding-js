import * as React from 'react';
import { IAction } from '../../actions/IAction';
import { errorMessageTypes } from '../../constants/errorMessageTypes';
import { OrderedMap } from 'immutable';
import * as PropTypes from 'prop-types';
import { alertTypes } from '../../constants/alert/alertTypes';
import { alertMessages } from '../../constants/alert/alertMessages';

export interface IRetryMarkerDataProps {
  text: string;
  textUpdate: string;
  errorMessages: OrderedMap<string, string>;
}

export interface IRetryMarkerCallbackProps {
  onUploadAgain: (text: string) => Promise<IAction>;
  onSaveAgain: (text: string) => Promise<IAction>;
  assertAlert: (type: alertTypes, message: alertMessages) => number;
}

const RetryMarker: React.StatelessComponent<IRetryMarkerDataProps & IRetryMarkerCallbackProps>
  = ({errorMessages, onUploadAgain, onSaveAgain, textUpdate, text, assertAlert}) => {

  function _onDoItAgain(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    if (errorMessages.keySeq().contains(errorMessageTypes.UPLOAD)) {
      if (textUpdate) onUploadAgain(textUpdate)
        .then(() => assertAlert(alertTypes.SUCCESS, alertMessages.UPLOAD_SUCCESS))
        .catch(() => assertAlert(alertTypes.ERROR, alertMessages.UPLOAD_ERROR));
      else onUploadAgain(text)
        .then(() => assertAlert(alertTypes.SUCCESS, alertMessages.UPLOAD_SUCCESS))
        .catch(() => assertAlert(alertTypes.ERROR, alertMessages.UPLOAD_ERROR));
    } else {
      onSaveAgain(textUpdate)
        .then(() => assertAlert(alertTypes.SUCCESS, alertMessages.UPDATE_SUCCESS))
        .catch(() => assertAlert(alertTypes.ERROR, alertMessages.UPDATEERROR));
    }
  }

  return (
    <div
      data-balloon={'Try again'}
      data-balloon-pos="up"
      className="uneditedItemMessage"
      onClick={_onDoItAgain}>
      ↺
      &nbsp;&nbsp;&nbsp;
    </div>);
};

RetryMarker.displayName = 'RetryMarker';

RetryMarker.propTypes = {
  text: PropTypes.string.isRequired,
  textUpdate: PropTypes.string.isRequired,
  errorMessages: PropTypes.object.isRequired,
};

export { RetryMarker };
