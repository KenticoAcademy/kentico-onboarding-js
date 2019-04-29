import * as moment from 'moment';

import { Map } from 'immutable';
import { ListItem } from '../models/ListItem';
import { timeFormat } from '../constants/timeFormat';
import { ListSorting } from '../constants/ListSorting';

const compareTwoTimes = (left: Time, right: Time): number =>
  moment.utc(moment(right, timeFormat))
    .diff(moment.utc(moment(left, timeFormat)));

const getSortStrategy = (sorting: ListSorting) =>
  (left: ListItem, right: ListItem): number => {
    switch (sorting) {
      case ListSorting.CreatedTime:
        return compareTwoTimes(left.creationTime, right.creationTime);
      case ListSorting.LastUpdateTime:
        return compareTwoTimes(left.lastUpdateTime, right.lastUpdateTime);
      default:
        throw new Error('Unknown sorting type');
    }
  };

export const sortItems = (items: Map<Uuid, ListItem>, sorting: ListSorting): ReadonlyArray<ListItem> => {
  const sortStrategy = getSortStrategy(sorting);
  return items.sort(sortStrategy).toArray();
};
