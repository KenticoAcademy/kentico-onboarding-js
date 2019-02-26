import { toast } from 'react-toastify';

export const createErrorPopup = (message: string): number =>
  toast.error('🦄' + message, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false
  });
