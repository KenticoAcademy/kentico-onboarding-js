import * as React from 'react';
import { IAction } from '../../actions/IAction';
import { errorMessageTypes } from '../../constants/errorMessageTypes';
import { OrderedMap } from 'immutable';
import * as PropTypes from 'prop-types';
import { alertTypes } from '../../constants/alert/alertTypes';
import { alertMessages } from '../../constants/alert/alertMessages';
import {AnyAction} from 'redux';
import {assertAlert} from '../../utils/assertAlert';

export interface IRetryMarkerStateProps {
  text: string;
  textUpdate: string;
  errorMessages: OrderedMap<string, string>;
}

export interface IRetryMarkerDispatchProps {
  onUploadAgain: (text: string) => Promise<IAction>;
  onSaveAgain: (text: string) => Promise<IAction>;
}

type IRetryMarkerProps = IRetryMarkerStateProps & IRetryMarkerDispatchProps;

const RetryMarker: React.StatelessComponent<IRetryMarkerProps>
  = ({errorMessages, onUploadAgain, onSaveAgain, textUpdate, text}) => {

  function getCorrectAction(): Promise<AnyAction> {
    if (errorMessages.keySeq().contains(errorMessageTypes.UPLOAD)) {
      if (textUpdate){
        return onUploadAgain(textUpdate);
      } else {
        return onUploadAgain(text);
      }} else
        return onSaveAgain(textUpdate);
  }

  function _onDoItAgain(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
   getCorrectAction()
   .then(() => assertAlert(alertTypes.SUCCESS, alertMessages.UPLOAD_SUCCESS))
   .catch(() => assertAlert(alertTypes.ERROR, alertMessages.UPLOAD_ERROR));
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
