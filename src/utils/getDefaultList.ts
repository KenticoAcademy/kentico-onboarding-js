import { Map } from 'immutable';

import {ListItem} from '../models/ListItem';
import { guid } from './guid';

const createMapItem = (text: string) => {
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

export const getDefaultList = () => Map<Uuid, ListItem>([
  createMapItem('aaaaa'),
  createMapItem('asdfg'),
]);
