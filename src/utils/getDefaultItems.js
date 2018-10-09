import { ListItem } from '../models/ListItem';
import { generateId } from './generateId';

export const getDefaultItems = () => {
  const buyMilkItem = new ListItem({
    id: generateId(),
    text: 'Buy Milk',
  });
  const masterReactItem = new ListItem({
    id: generateId(),
    text: 'Master React',
  });
  const learnReduxItem = new ListItem({
    id: generateId(),
    text: 'Learn Redux',
  });
  const helpMakingDraftAwesomeItem = new ListItem({
    id: generateId(),
    text: 'Help making Draft awesome',
  });

  return [
    [buyMilkItem.id, buyMilkItem],
    [masterReactItem.id, masterReactItem],
    [learnReduxItem.id, learnReduxItem],
    [helpMakingDraftAwesomeItem.id, helpMakingDraftAwesomeItem]
  ];
};
