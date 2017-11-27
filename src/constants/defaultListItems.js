import { addItem } from '../actions/actionCreators';
import { generateId } from '../utils/generateId';

const defaultListItems = (store) => {
  store.dispatch(addItem(generateId(), 'Make a coffee'));
  store.dispatch(addItem(generateId(), 'Master React'));
  store.dispatch(addItem(generateId(), 'Learn Redux'));
  store.dispatch(addItem(generateId(), 'Help making Draft awesome'));
};

export { defaultListItems };
