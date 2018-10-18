import { Item } from '../models/Item';
import { generateId } from './generateId';

export const getInitialItems = (): Item[] => {
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

  return [dog, cat, elephant];
};
