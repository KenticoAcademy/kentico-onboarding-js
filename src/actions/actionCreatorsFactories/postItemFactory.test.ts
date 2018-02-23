import { postItemFactory } from './postItemFactory';

describe('post item tests', () => {
  const postTestItem = {
    id: 'e1f5c5e4-7f5e-4aa0-9e52-117cc8267f12',
    text: 'item'
  };
  const postSuccess = jest.fn();
  const dispatch = jest.fn(input => input);
  const postError = jest.fn();
  const insertItem = jest.fn();

  it('creates ITEM_POST_SUCCESS on correct POST request', (done) => {
    const generateId = jest.fn();
    postSuccess.mock.calls.length = 0;
    const fetchedTestItem = {
      id: 'e1f5c5e4-7f5e-4aa0-9e52-117cc8267f13',
      text: 'item'
    };
    const post = (
      _url: string,
      {_text}: { _text: string }) =>
      Promise.resolve({
        data: [{
          id: fetchedTestItem.id,
          text: fetchedTestItem.text
        }]
      });
    const postItem = postItemFactory(
      {
        insertItem,
        generateId,
        postSuccess,
        postError,
        getAxios: ({
          axios: {
            post
          },
          url: 'fake_url'
        })
      });

    postItem(postTestItem.text)(dispatch)
      .then(() => {
        expect(postSuccess.mock.calls.length).toBe(1);
        done();
      })
      .catch(err => console.log(err));
  });

  it('creates ITEM_POST_SUCCESS with correct arguments', (done) => {
    postSuccess.mock.calls.length = 0;
    const generateId = jest.fn(() => postTestItem.id);
    const fetchedTestItem = {
      id: 'e1f5c5e4-7f5e-4aa0-9e52-117cc8267f13',
      text: 'item'
    };
    const post = (_url: string, {_text}: { _text: string }) =>
      Promise.resolve({
        data: {
          id: fetchedTestItem.id,
          text: fetchedTestItem.text
        }
      });
    const postItem = postItemFactory(
      {
        insertItem,
        generateId,
        postSuccess,
        postError,
        getAxios: ({
          axios: {
            post
          },
          url: 'fake_url'
        })
      });

    postItem(postTestItem.text)(dispatch)
      .then(() => {
        expect(postSuccess.mock.calls[0][0].newId).toEqual(fetchedTestItem.id);
        expect(postSuccess.mock.calls[0][0].id).toEqual(postTestItem.id);
        expect(postSuccess.mock.calls[0][0].text).toEqual(fetchedTestItem.text);
        expect(postSuccess.mock.calls[0][0].isSynchronized).toEqual(true);
        done();
      })
      .catch(err => console.log(err));
  });

  it('creates ITEM_POST_ERROR on POST request failure', (done) => {
    const generateId = jest.fn();
    postError.mock.calls.length = 0;
    const post = (_url: string, {_text}: { _text: string }) =>
      Promise.reject({
        response:
          {
            status: 400,
            statusText: 'Bad Request',
          }
      });
    const postItem = postItemFactory(
      {
        insertItem,
        generateId,
        postSuccess,
        postError,
        getAxios: ({
          axios: {
            post
          },
          url: 'fake_url'
        })
      });

    postItem(postTestItem.text)(dispatch)
      .then(() => {
        expect(postError.mock.calls.length).toBe(1);
        done();
      })
      .catch(err => console.log(err));
  });
});
