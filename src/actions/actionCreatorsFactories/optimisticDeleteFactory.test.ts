import { optimisticDeleteFactory } from './optimisticDeleteFactory';

describe('optimistic delete tests', () => {
  it('dispatches deleteLocally and deleteFromServer with correct ids', () => {
    const deleteLocally = jest.fn();
    const deleteFromServer = jest.fn();
    const dispatch = jest.fn(input => input);
    const id = '6934b014-2321-4e28-83b6-bb4a00f23739';
    const optimisticDelete = optimisticDeleteFactory(deleteLocally, deleteFromServer);

    optimisticDelete(id)(dispatch);

    expect(deleteLocally.mock.calls.length).toEqual(1);
    expect(deleteFromServer.mock.calls.length).toEqual(1);
    expect(deleteLocally.mock.calls[0][0]).toEqual(id);
    expect(deleteFromServer.mock.calls[0][0]).toEqual(id);
  });
});
