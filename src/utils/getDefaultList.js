import { OrderedMap } from 'immutable';

import { ListItem } from '../models/ListItem';
import { guid } from './guid';

const createMapItem = (text) => {
  const id = guid();

  return [
    id,
    new ListItem({
      id,
      text
    })
  ];
};

export const getDefaultList = () => new OrderedMap([
  createMapItem('aaaaa'),
  createMapItem('asdfg'),
]);
