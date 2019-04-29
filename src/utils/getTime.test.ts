import { getTimeCreator } from './getTime';
import * as moment from 'moment';

describe('getTime', () => {
  it('returns time in expected format', () => {
    const expectedTime = '2018-12-17 15:06:32';
    const time = moment(expectedTime);
    const getTime = getTimeCreator(() => time);

    const actualTime = getTime();

    expect(actualTime).toEqual(expectedTime);
  });
});
