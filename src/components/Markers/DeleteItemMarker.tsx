import * as React from 'react';
import * as PropTypes from 'prop-types';
import {alertTypes} from '../../constants/alert/alertTypes';
import {alertMessages} from '../../constants/alert/alertMessages';
import {IAction} from '../../actions/IAction';
import {assertAlert} from '../../utils/assertAlert';
import {confirmAlert} from 'react-confirm-alert';


export interface IDeleteItemMarkerDispatchProps {
  onThrowAway: () => Promise<IAction>;
}

type IDeleteMarkerProps = IDeleteItemMarkerDispatchProps;

export class DeleteItemMarker extends React.PureComponent<IDeleteMarkerProps> {

  static displayName = 'DeleteItemMarker';

  static propTypes = {
    onThrowAway: PropTypes.func.isRequired,
  };

  _throwItemAway = () => {
    confirmAlert({
      title: 'Do you really want this item to be eaten?',
      message: 'The shark approves.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.props.onThrowAway()
            .then(() => assertAlert(alertTypes.SUCCESS, alertMessages.DELETION_SUCCESS))
            .catch(() => assertAlert(alertTypes.ERROR, alertMessages.DELETION_ERROR)),
        }, {
          label: 'No',
          onClick: () => null,
        },
      ],
    });
  };

  render() {
    return (<div
      data-balloon={'Let this shark eat this item'}
      data-balloon-pos="up"
      className="list__item__inline_content"
      onClick={this._throwItemAway}
    >
      🦈 </div>);
  }
}
