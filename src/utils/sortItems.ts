import * as moment from 'moment';

import { OrderedMap } from 'immutable';
import { ListItem } from '../models/ListItem';
import { timeFormat } from '../constants/timeFormat';
import { ListSorting } from '../constants/ListSorting';

export const sortItems = (items: OrderedMap<Uuid, ListItem>, sorting: ListSorting): ListItem[] => {
  if (sorting === ListSorting.LastUpdateTime) {
    return items.sort( (left: ListItem, right: ListItem) => {
      return moment.utc(moment(right.lastUpdateTime, timeFormat)).diff(moment.utc(moment(left.lastUpdateTime, timeFormat)));
    }).toArray();
  }
  // else sorting === ListSorting.CreatedTime
  return items.sort( (left: ListItem, right: ListItem) => {
    return moment.utc(moment(right.creationTime, timeFormat)).diff(moment.utc(moment(left.creationTime, timeFormat)));
  }).toArray();
};
