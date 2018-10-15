import * as React from 'react';
import { IAction } from '../../actions/IAction';
import { errorMessageTypes } from '../../constants/errorMessageTypes';
import { OrderedMap } from 'immutable';
import * as PropTypes from 'prop-types';
import { alertTypes } from '../../constants/alert/alertTypes';
import { alertMessages } from '../../constants/alert/alertMessages';

export interface IRetryMarkerStateProps {
  text: string;
  textUpdate: string;
  errorMessages: OrderedMap<string, string>;
}

export interface IRetryMarkerDispatchProps {
  onUploadAgain: (text: string) => Promise<IAction>;
  onSaveAgain: (text: string) => Promise<IAction>;
  assertAlert: (type: alertTypes, message: alertMessages) => number;
}

type IRetryMarkerProps = IRetryMarkerStateProps & IRetryMarkerDispatchProps;

const RetryMarker: React.StatelessComponent<IRetryMarkerProps>
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
        .catch(() => assertAlert(alertTypes.ERROR, alertMessages.UPDATE_ERROR));
    }
  }

  return (
    <div
      data-balloon={'Try again'}
      data-balloon-pos="up"
      className="list__item__inline_content"
      onClick={_onDoItAgain}>
      ↺
    </div>);
};

RetryMarker.displayName = 'RetryMarker';

RetryMarker.propTypes = {
  text: PropTypes.string.isRequired,
  textUpdate: PropTypes.string.isRequired,
  errorMessages: PropTypes.object.isRequired,
};

export { RetryMarker };
