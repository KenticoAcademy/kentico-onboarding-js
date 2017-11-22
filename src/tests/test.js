import items from '../reducers/items';
import { addItem } from '../utils/actionCreators';
import expect from 'expect';

const testThemAll = () => {
  return testAddItem();
};

const testAddItem = () => {
  const stateBefore = [];
  const stateAfter = [
    {
      id: '000',
      text: 'Item1',
      isBeingEdited: false,
    },
  ];
  expect(items(stateBefore, addItem('Item1', '000'))).toEqual(stateAfter);
};

export default testThemAll();
