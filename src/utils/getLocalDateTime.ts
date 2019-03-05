import * as moment from 'moment';
import { timeFormat } from '../constants/timeFormat';

// This function will be use in item.ts when the context will be working.
export const getLocalDateTime = (time: Time): Time => {
  const stillUtc = moment.utc(time).toDate();
  const local = moment(stillUtc).local().format(timeFormat);
  return local;
};
