import * as moment from 'moment';
import { timeFormat } from '../constants/timeFormat';

export const getCurrentDateTime = (): Time => moment().format(timeFormat);
