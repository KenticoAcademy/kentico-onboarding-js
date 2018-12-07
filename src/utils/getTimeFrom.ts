import * as moment from 'moment';
import { timeFormat } from '../constants/timeFormat';


export const getTimeFrom = (renderTime: Time, time: Time): Time => {
    const fromNow = moment(time, timeFormat).from(renderTime);

    return fromNow.includes('years ago') ? 'in ancient times' : fromNow;
  };
