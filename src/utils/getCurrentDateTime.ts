import * as moment from 'moment';
import { timeFormat } from '../constants/timeFormat';

export const getCurrentDateTime = () => moment().format(timeFormat);

