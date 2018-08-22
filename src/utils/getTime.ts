import { timeFormat } from '../constants/timeFormat';
import * as moment from 'moment';

export const getTimeCreator = (getCurrentTime: () => moment.Moment): () => Time  =>
  (): Time =>
    getCurrentTime().format(timeFormat);

export const getTime = getTimeCreator(moment);
