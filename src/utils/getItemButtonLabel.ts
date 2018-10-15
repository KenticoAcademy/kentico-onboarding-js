import {errorMessageTypes} from '../constants/errorMessageTypes';
import {IItem} from '../models/Item';

export const getItemButtonLabel = (item: IItem): string => {
  const uploadError = item.errorMessages.keySeq().contains(errorMessageTypes.UPLOAD);
  const someError = item.errorMessages.size !== 0;

  if (uploadError) return 'Modify the word you wanted to upload!';
  if (someError) return 'Save the word again!';
  return 'Save the word!';
};
