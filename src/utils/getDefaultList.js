import { OrderedMap } from 'immutable';

import { ListItem } from '../models/ListItem';
import { guid } from './guid';

const createMapItem = (text) => {
  const id = guid();

  return [
    id,
    new ListItem({
      id,
      text,
      isActive: false
    })
  ];
};

export const getDefaultList = () => OrderedMap([
  createMapItem('aaaaa'),
  createMapItem('asdfg'),
]);
