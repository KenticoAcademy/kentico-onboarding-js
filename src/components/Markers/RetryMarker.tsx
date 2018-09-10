import * as React from 'react';
import { IAction } from '../../actions/IAction';
import { errorMessageTypes } from '../../constants/errorMessageTypes';
import { OrderedMap } from 'immutable';
import * as PropTypes from 'prop-types';

export interface IRetryMarkerDataProps {
  text: string;
  textUpdate: string;
  errorMessages: OrderedMap<string, string>;
}

export interface IRetryMarkerCallbackProps {
  onUploadAgain: (text: string) => Promise<IAction>;
  onSaveAgain: (text: string) => Promise<IAction>;
}

const RetryMarker: React.StatelessComponent<IRetryMarkerDataProps & IRetryMarkerCallbackProps>
  = ({errorMessages, onUploadAgain, onSaveAgain, textUpdate, text}) => {

  function _onDoItAgain(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    if (errorMessages.keySeq().contains(errorMessageTypes.UPLOAD)) {
      if (textUpdate) onUploadAgain(textUpdate);
      else onUploadAgain(text);
    } else {
      onSaveAgain(textUpdate);
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
