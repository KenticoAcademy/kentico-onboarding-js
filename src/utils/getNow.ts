import * as moment from 'moment';
import { timeFormat } from '../constants/timeFormat';

export const getNow = () => moment().format(timeFormat);
