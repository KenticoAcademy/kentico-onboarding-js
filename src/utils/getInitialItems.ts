import { OrderedMap } from 'immutable';
import { Item } from '../models/ItemRecord';
import { generateId } from './generateId';

export const getInitialItems = () => {
  const dog = new Item({
    id: generateId(),
    text: 'Dog',
  });
  const cat = new Item({
    id: generateId(),
    text: 'Cat',
  });
  const elephant = new Item({
    id: generateId(),
    text: 'Elephant',
  });

  return OrderedMap({
    [dog.id]: dog,
    [cat.id]: cat,
    [elephant.id]: elephant,
  });
};
