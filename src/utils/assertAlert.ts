import Alert from 'react-s-alert';
import {alertMessages} from '../constants/alert/alertMessages';
import {alertTypes} from '../constants/alert/alertTypes';


const options = {
  position: 'top-right',
  effect: 'stackslide',
  timeout: 3000,
};

export function assertAlert(type: alertTypes, message: alertMessages) {
  switch (type) {
    case 'ERROR':
      return Alert.error(message, options);
    case 'SUCCESS':
      return Alert.success(message, options);
    default:
      throw Error('Unknown alert type');
  }
}
