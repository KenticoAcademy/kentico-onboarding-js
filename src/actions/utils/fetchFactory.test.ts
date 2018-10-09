import 'isomorphic-fetch';
import { headerBase } from './headerBase';
import Mock = jest.Mock;
import { fetchFactory } from './fetchFactory';
import { GATEWAY_TIMEOUT_MESSAGE, NOT_FOUND_MESSAGE, UNKNOWN_MESSAGE } from './errorMessages';

describe('fetchFactory', () => {
  const mockResponse = (status: number, statusText?: string, response?: BodyInit) =>
    new Response(response, {
      status,
      statusText,
      headers: headerBase.headers,
    });

  let fetchResponse: Response;
  let fetch: Mock;

  beforeEach(() => {
    fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(fetchResponse),
    );
  });

  it('for status code 400 throws message with model state', () => {
    const errors: string = '{"":["Received item must not be null."],"Text":["Text must be non-empty."]}';
    fetchResponse = mockResponse(400, '', '{"ModelState":' + errors + '}');

    fetchFactory(fetch, 'localhost:42/random', {})
      .catch(
        error => expect(error.message).toEqual(errors),
      );
  });

  it('for status code 404 throws not found message', () => {
    fetchResponse = mockResponse(404, '');

    fetchFactory(fetch, 'localhost:42/random', {})
      .catch(
        error => expect(error.message).toEqual(NOT_FOUND_MESSAGE),
      );
  });

  it('for status code 504 throws gateway timeout message', () => {
    fetchResponse = mockResponse(504, '');

    fetchFactory(fetch, 'localhost:42/random', {})
      .catch(
        error => expect(error.message).toEqual(GATEWAY_TIMEOUT_MESSAGE),
      );
  });

  it('for unknown status code throws unknown message', () => {
    fetchResponse = mockResponse(42, '');

    fetchFactory(fetch, 'localhost:42/random', {})
      .catch(
        error => expect(error.message).toEqual(UNKNOWN_MESSAGE),
      );
  });

  it('for status code 200 returns response', () => {
    fetchResponse = mockResponse(200, undefined, '{"id":"1","text":"Text1"}');

    fetchFactory(fetch, 'localhost:42/random', {})
      .then(
        response => response.json(),
      )
      .then(
        json => {
          expect(json.id).toBe('1');
          expect(json.text).toBe('Text1');
        },
      );
  });
});
