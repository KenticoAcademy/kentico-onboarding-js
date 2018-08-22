import * as moment from 'moment';
import { timeFormat } from '../constants/timeFormat';


export const getTimeFrom = (getNow: () => moment.Moment): (time: Time) => string =>
  (time: Time): string => {
    const fromNow = moment(time, timeFormat).from(getNow());

    return fromNow.includes('years ago') ? 'in ancient times' : fromNow;
  };

export const getTimeFromNow = getTimeFrom(moment);
