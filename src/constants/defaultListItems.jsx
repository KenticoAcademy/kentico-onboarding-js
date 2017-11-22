import { addItem } from '../utils/actionCreators';
import { generateId } from '../utils/generateId';

const defaultListItems = (store) => {
  store.dispatch(addItem('Make a coffee', generateId()));
  store.dispatch(addItem('Master React', generateId()));
  store.dispatch(addItem('Learn Redux', generateId()));
  store.dispatch(addItem('Help making Draft awesome', generateId()));
};

export { defaultListItems };
