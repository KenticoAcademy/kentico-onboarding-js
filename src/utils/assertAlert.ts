import Alert from 'react-s-alert';

const options = {
  position: 'top-right',
  effect: 'stackslide',
  timeout: 3000
};

export function assertAlert(type: string, message: string) {
  switch (type) {
    case 'ERROR':
      return Alert.error(message, options);
    case 'SUCCESS':
      return Alert.success(message, options);
    default:
      return -1;
  }
}
