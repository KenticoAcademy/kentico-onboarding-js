import {
  axiosDeleteFactory,
  axiosFetchFactory,
  axiosPostFactory,
  axiosPutFactory
} from './axiosFactories';

describe('Axios factories tests', () => {
  it ('invokes get with url in axiosFetchFactory', () => {
    const get = jest.fn();
    const axios = {
      get
    };
    const url = '/test/url';

    axiosFetchFactory(axios, url)();

    expect(get.mock.calls.length).toEqual(1);
  });

  it ('invokes get with url in axiosFetchFactory with correct argument', () => {
    const get = jest.fn();
    const axios = {
      get
    };
    const url = '/test/url';

    axiosFetchFactory(axios, url)();

    expect(get.mock.calls[0][0]).toEqual(url);
  });

  it ('invokes post with url in axiosPostFactory', () => {
    const post = jest.fn();
    const axios = {
      post
    };
    const url = '/test/url';
    const postItem = {
      text: 'text'
    };

    axiosPostFactory(axios, url)(postItem);

    expect(post.mock.calls.length).toEqual(1);
  });

  it ('invokes post with url in axiosPostFactory with correct arguments', () => {
    const post = jest.fn();
    const axios = {
      post
    };
    const url = '/test/url';
    const postItem = {
      text: 'text'
    };

    axiosPostFactory(axios, url)(postItem);

    expect(post.mock.calls[0][0]).toEqual(url);
    expect(post.mock.calls[0][1]).toEqual(postItem);
  });

  it ('invokes put with url in axiosPutFactory', () => {
    const put = jest.fn();
    const axios = {
      put
    };
    const url = '/test/url';
    const putItem = {
      id: 'e2966b62-1f4c-4026-8def-ac9114df6dc7',
      text: 'text'
    };

    axiosPutFactory(axios, url)(putItem);

    expect(put.mock.calls.length).toEqual(1);
  });

  it ('invokes put with url in axiosPutFactory with correct arguments', () => {
    const put = jest.fn();
    const axios = {
      put
    };
    const putItem = {
      id: 'e2966b62-1f4c-4026-8def-ac9114df6dc7',
      text: 'text'
    };
    const url = '/test/url';
    const expectedUrl = `${url}/${putItem.id}`;

    axiosPutFactory(axios, url)(putItem);

    expect(put.mock.calls[0][0]).toEqual(expectedUrl);
    expect(put.mock.calls[0][1]).toEqual(putItem);
  });

  it ('invokes delete with url in axiosDeleteFactory', () => {
    const deleteItem = jest.fn();
    const axios = {
      delete: deleteItem
    };
    const url = '/test/url';
    const id = 'e2966b62-1f4c-4026-8def-ac9114df6dc7';

    axiosDeleteFactory(axios, url)(id);

    expect(deleteItem.mock.calls.length).toEqual(1);
  });

  it ('invokes delete with url in axiosDeleteFactory with correct argument', () => {
    const deleteItem = jest.fn();
    const axios = {
      delete: deleteItem
    };
    const url = '/test/url';
    const id = 'e2966b62-1f4c-4026-8def-ac9114df6dc7';
    const expectedUrl = `${url}/${id}`;

    axiosDeleteFactory(axios, url)(id);

    expect(deleteItem.mock.calls[0][0]).toEqual(expectedUrl);
  });
});
