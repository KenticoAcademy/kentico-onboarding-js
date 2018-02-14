import { optimisticAddFactory } from './optimisticAddFactory';

describe('optimistic add tests', () => {
  it('dispatches insertItemToList and postItem with correct arguments', () => {
    const insertItemToList = jest.fn();
    const postItem = jest.fn();
    const dispatch = jest.fn(input => input);
    const text = 'new item text';
    const tempId = '1234b014-2321-4e28-83b6-bb4a00f24321';
    const generateId = jest.fn(() => tempId);
    const optimisticAdd = optimisticAddFactory(generateId, insertItemToList, postItem);

    optimisticAdd(text)(dispatch);

    expect(insertItemToList.mock.calls.length).toEqual(1);
    expect(postItem.mock.calls.length).toEqual(1);
    expect(insertItemToList.mock.calls[0][0]).toEqual({text, id: tempId, isSynchronized: false});
    expect(postItem.mock.calls[0][0]).toEqual(tempId);
    expect(postItem.mock.calls[0][1]).toEqual(text);
  });
});
