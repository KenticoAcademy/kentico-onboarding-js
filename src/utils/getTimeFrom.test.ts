import { getTimeFrom } from './getTimeFrom';
import * as moment from 'moment';
import { timeFormat } from '../constants/timeFormat';

const fromTime = moment('2018-12-17 15:30').format(timeFormat);

describe('getTimeFromNow', () => {
  [
    { time: '2018-12-17 15:05', result: '25 minutes ago' },
    { time: '2017-12-17 20:01', result: 'a year ago' },
    { time: '2015-12-17 03:49', result: 'in ancient times' },
    { time: '2019-03-16 23:16', result: 'in 3 months' },
    { time: '2018-12-15 15:30', result: '2 days ago' },
    { time: '2018-12-17 20:30', result: 'in 5 hours' },
  ].forEach(testCase =>
    it(`returns good relative time for ${testCase.time} and ${fromTime}`, () => {
      const timeFromNow = getTimeFrom(fromTime, testCase.time);

      expect(timeFromNow).toEqual(testCase.result);
    })
  );

});
