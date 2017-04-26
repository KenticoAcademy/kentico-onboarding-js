// import { CREATE_ITEM } from './actionTypes';
// import { Dispatch } from '../stores/Dispatch';
// import { Item } from '../models/Item';
// import { postItem } from './actionCreators';
//
// const createItem = (value: string, generateId: () => string) => {
//   return (dispatch: Dispatch) => {
//
//     const item = new Item({ ueid: generateId(), value })
//
//     dispatch(addItem(value, item.ueid));
//
//     return postItem(value, item.ueid);
//   }
// };
//
// const addItem = (value: string, ueid: string) => ({
//   type: CREATE_ITEM,
//   payload: {
//     ueid,
//     value,
//   }
// });

// const createItemFactory = (generateId: () => string) =>
//   (value: string) => createItem(value, generateId);

// export { createItemFactory };
