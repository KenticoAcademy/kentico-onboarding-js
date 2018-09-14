import { OrderedMap } from 'immutable';
import { ListItem } from './ListItem';

export const initialState = {
  items: OrderedMap([
    [
      'a69b5670-2423-4ca9-a3ce-0854d24985f4',
      new ListItem({
        id: 'a69b5670-2423-4ca9-a3ce-0854d24985f4',
        text: 'Buy Milk',
      })
    ],
    [
      'b69b5670-2423-4ca9-a3ce-0854d24985f4',
      new ListItem({
        id: 'b69b5670-2423-4ca9-a3ce-0854d24985f4',
        text: 'Master React',
      })
    ],
    [
      'c69b5670-2423-4ca9-a3ce-0854d24985f4',
      new ListItem({
        id: 'c69b5670-2423-4ca9-a3ce-0854d24985f4',
        text: 'Learn Redux',
      })
    ],
    [
      'd69b5670-2423-4ca9-a3ce-0854d24985f4',
      new ListItem({
        id: 'd69b5670-2423-4ca9-a3ce-0854d24985f4',
        text: 'Help making Draft awesome',
      })
    ]
  ])
};
