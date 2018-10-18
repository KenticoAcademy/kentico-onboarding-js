import * as React from 'react';
import {IAction} from '../../actions/IAction';
import * as PropTypes from 'prop-types';
import {alertTypes} from '../../constants/alert/alertTypes';
import {alertMessages} from '../../constants/alert/alertMessages';
import {assertAlert} from '../../utils/assertAlert';
import {IRetryMarkerContainerProps, statusOfItemToBeProcessed} from '../../containers/Markers/RetryMarker';
import {AnyAction} from 'redux';


export interface IRetryMarkerStateProps {
  text: string;
  textUpdate: string;
  itemToBeProcessed: statusOfItemToBeProcessed;
}

export interface IRetryMarkerDispatchProps {
  onUploadAgain: (text: string) => Promise<IAction>;
  onSaveAgain: (text: string) => Promise<IAction>;
}

type IRetryMarkerProps = IRetryMarkerStateProps & IRetryMarkerDispatchProps & IRetryMarkerContainerProps;

const getCorrectRetryAction = (itemToBeProcessed: statusOfItemToBeProcessed,
  onUploadAgain: (text: string) => Promise<IAction>,
  onSaveAgain: (text: string) => Promise<IAction>,
  text: string,
  textUpdate: string): Promise<AnyAction> => {

  switch (itemToBeProcessed) {
    case statusOfItemToBeProcessed.NEW_MODIFIED:
      return onUploadAgain(textUpdate);

    case statusOfItemToBeProcessed.NEW_CONSISTENT:
      return onUploadAgain(text);

    case statusOfItemToBeProcessed.EXISTING_MODIFIED:
      return onSaveAgain(textUpdate);

    default:
      throw new Error();
  }
};

export class RetryMarker extends React.PureComponent<IRetryMarkerProps> {

  static displayName = 'RetryMarker';

  static propTypes = {
    text: PropTypes.string.isRequired,
    textUpdate: PropTypes.string.isRequired,
    itemToBeProcessed: PropTypes.string.isRequired,
    onUploadAgain: PropTypes.func.isRequired,
    onSaveAgain: PropTypes.func.isRequired,
  };

  _onDoItAgain(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    getCorrectRetryAction(
      this.props.itemToBeProcessed,
      this.props.onUploadAgain,
      this.props.onSaveAgain,
      this.props.text,
      this.props.textUpdate)
      .then(() => assertAlert(alertTypes.SUCCESS, alertMessages.UPLOAD_SUCCESS))
      .catch(() => assertAlert(alertTypes.ERROR, alertMessages.UPLOAD_ERROR));
  }

  render() {
    return (<div
      data-balloon={'Try again'}
      data-balloon-pos="up"
      className="list__item__inline_content"
      onClick={this._onDoItAgain.bind(this)}
    >
      ↺ </div>);
  }
}
