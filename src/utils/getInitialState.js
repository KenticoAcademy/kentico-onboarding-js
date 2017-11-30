import { OrderedMap } from 'immutable';
import { generateId } from './generateId';
import { ListItem } from '../models/ListItem';

const itemNames = [
  'Make a coffee',
  'Master ReactJS',
  'Learn ReduxJS',
  'Help making Kentico Cloud awesome!',
];

export const getInitialState = () => ({
  todoList: {
    items: OrderedMap(
      itemNames
        .map((itemText) => {
          const guid = generateId();
          return (
          [
            guid,
            new ListItem({
              id: guid,
              text: itemText,
            }),
          ]
          );
        })
    ),
  },
});
