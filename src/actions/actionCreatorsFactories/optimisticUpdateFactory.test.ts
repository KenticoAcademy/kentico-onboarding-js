import { optimisticUpdateFactory } from './optimisticUpdateFactory';

describe('optimistic update tests', () => {
  it('dispatches updateItemLocally and putItem with correct arguments', () => {
    const updateItemLocally = jest.fn();
    const putItem = jest.fn();
    const dispatch = jest.fn(input => input);
    const id = '6934b014-2321-4e28-83b6-bb4a00f23739';
    const updateText = 'updatedText';
    const optimisticUpdate = optimisticUpdateFactory(updateItemLocally, putItem);

    optimisticUpdate(id, updateText)(dispatch);

    expect(updateItemLocally.mock.calls.length).toEqual(1);
    expect(putItem.mock.calls.length).toEqual(1);
    expect(updateItemLocally.mock.calls[0][0]).toEqual({id, text: updateText});
    expect(putItem.mock.calls[0][0]).toEqual(id);
    expect(putItem.mock.calls[0][1]).toEqual(updateText);
  });
});
