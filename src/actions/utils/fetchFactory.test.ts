import 'isomorphic-fetch';
import { headerBase } from './headerBase';
import Mock = jest.Mock;
import { fetchFactory } from './fetchFactory';
import { GATEWAY_TIMEOUT_MESSAGE, NOT_FOUND_MESSAGE } from './errorMessages';

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
  let itemFetch: Fetch;

  beforeEach(() => {
    fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(fetchResponse),
    );
    itemFetch = fetchFactory(fetch, urlBase, headerBase);
  });

  it('for status code 400 throws message with model state', async () => {
    const errors: string = '{"":["Received item must not be null."],"Text":["Text must be non-empty."]}';
    fetchResponse = mockResponse(400, '', '{"ModelState":' + errors + '}');

    await expect(itemFetch('/random', {})).rejects.toThrow(errors);
  });

  it('for status code 404 throws not found message', async () => {
    fetchResponse = mockResponse(404, '');

    await expect(itemFetch('/random', {})).rejects.toThrow(NOT_FOUND_MESSAGE);
  });

  it('for status code 504 throws gateway timeout message', async () => {
    fetchResponse = mockResponse(504, '');

    await expect(itemFetch('/random', {})).rejects.toThrow(GATEWAY_TIMEOUT_MESSAGE);
  });

  it('for unknown status code throws unknown message', async () => {
    const statusText = 'This is unknown message';
    fetchResponse = mockResponse(42, statusText);

    await expect(itemFetch('/random', {})).rejects.toThrow(statusText);
  });

  it('for status code 200 returns response', async () => {
    fetchResponse = mockResponse(200, undefined, '{"id":"1","text":"Text1"}');

    const response: Response = await itemFetch('/random', {});
    const json = await response.json();

    expect(json.id).toBe('1');
    expect(json.text).toBe('Text1');
  });

  it('calls fetch with correct arguments', async () => {
    const url = '/random';
    const init = {method: 'GET'};
    const expectedRequestInit: RequestInit = {
      ...headerBase,
      ...init,
    };
    fetchResponse = mockResponse(200, undefined, '[{"id":"1","text":"Text1"}]');

    const response: Response = await itemFetch(url, init);
    await response.json();

    expect(fetch.mock.calls.length).toBe(1);
    expect(fetch.mock.calls[0][0]).toEqual(urlBase + url);
    expect(fetch.mock.calls[0][1]).toEqual(expectedRequestInit);
  });
});
