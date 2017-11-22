import { addItem } from '../utils/actionCreators';

const defaultListItems = (store) => {
  store.dispatch(addItem('Make a coffee'));
  store.dispatch(addItem('Master React'));
  store.dispatch(addItem('Learn Redux'));
  store.dispatch(addItem('Help making Draft awesome'));
};

export { defaultListItems };
