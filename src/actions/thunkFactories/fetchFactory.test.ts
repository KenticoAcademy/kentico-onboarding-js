import 'isomorphic-fetch';
import { headerBase } from '../utils/headerBase';
import Mock = jest.Mock;
import {
  FetchConfig,
  fetchFactory,
} from './fetchFactory';
import { GATEWAY_TIMEOUT_MESSAGE, NOT_FOUND_MESSAGE } from '../utils/errorMessages';

describe('fetchFactory', () => {
  const mockResponse = (status: number, statusText?: string, response?: BodyInit) =>
    new Response(response, {
      status,
      statusText,
      headers: headerBase.headers,
    });

  const urlBase = 'localhost:42';
  let fetchResponse: Response;
  let fetch: Mock;
  let itemFetch: (config: FetchConfig) => Promise<Response>;

  beforeEach(() => {
    fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(fetchResponse),
    );
    itemFetch = fetchFactory(fetch, urlBase, headerBase)({method: 'POST'});
  });

  it('for status code 400 throws message with model state', async () => {
    const errors: string = '{"":["Received item must not be null."],"Text":["Text must be non-empty."]}';
    fetchResponse = mockResponse(400, '', '{"ModelState":' + errors + '}');

    await expect(itemFetch({ id: '1' })).rejects.toThrow(errors);
  });

  it('for status code 404 throws not found message', async () => {
    fetchResponse = mockResponse(404, '');

    await expect(itemFetch({ id: '1' })).rejects.toThrow(NOT_FOUND_MESSAGE);
  });

  it('for status code 504 throws gateway timeout message', async () => {
    fetchResponse = mockResponse(504, '');

    await expect(itemFetch({ id: '1' })).rejects.toThrow(GATEWAY_TIMEOUT_MESSAGE);
  });

  it('for unknown status code throws unknown message', async () => {
    const statusText = 'This is unknown message';
    fetchResponse = mockResponse(42, statusText);

    await expect(itemFetch({ id: '1' })).rejects.toThrow(statusText);
  });

  it('for status code 200 returns response', async () => {
    const item = {
      id: '1',
      text: 'Text1',
    };
    fetchResponse = mockResponse(200, undefined, JSON.stringify(item));

    const response: Response = await itemFetch({ id: '1' });
    const json = await response.json();

    expect(json.id).toBe(item.id);
    expect(json.text).toBe(item.text);
  });

  it('calls fetch with correct arguments', async () => {
    const item = {
      id: '1',
      text: 'Text1',
    };
    const expectedRequestInit: RequestInit = {
      ...headerBase,
      method: 'POST',
    };
    fetchResponse = mockResponse(200, undefined, JSON.stringify(item));

    const response: Response = await itemFetch({ id: item.id });
    await response.json();

    expect(fetch.mock.calls.length).toBe(1);
    expect(fetch.mock.calls[0][0]).toEqual(urlBase + `/${item.id}`);
    expect(fetch.mock.calls[0][1]).toEqual(expectedRequestInit);
  });
});
