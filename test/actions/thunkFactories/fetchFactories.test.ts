import { Promise } from 'es6-promise';
import { mockServerNote } from '../../testUtils/mocks';
import { HttpMethods } from '../../../src/enums/HttpMethods';
import {
  fetchWithIdFactory,
  fetchFactory
} from '../../../src/actions/thunkFactories/fetchFactories';
import { IServerNote } from '../../../src/models/Note';

const NOTE_ID = '1';
const POST_NOTE = { text: 'test text' };
const HTTP_ERROR_STATUS = 500;
const HTTP_SUCCESS_STATUS = 200;

const mockResolvedFetch = (status: number, ok: boolean) =>
  jest.fn(() => Promise.resolve({
    status,
    ok,
    json: () => JSON.stringify(mockServerNote(POST_NOTE.text, NOTE_ID))
  }));

const mockRejectedFetch = () =>
  jest.fn(() => Promise.reject(() => {
    throw 'test error';
  }));

describe('FetchWithIdFactory', () => {
  it('should throw an error when promise is resolved but response.ok is false - error 500.', () => {
    const mockedFetch = mockResolvedFetch(HTTP_ERROR_STATUS, false);
    const saveFunction = fetchWithIdFactory(mockedFetch, () => 'test', HttpMethods.GET);

    return saveFunction(NOTE_ID)
      .then(
        () => fail('Expected error was not throw for http code 500!'),
        error => expect(error).toBeTruthy()
      );
  });

  it('should return correct object when response.ok is true - status code 200.', () => {
    const mockedFetch = mockResolvedFetch(HTTP_SUCCESS_STATUS, true);
    const saveFunction = fetchWithIdFactory(mockedFetch, () => `test/${NOTE_ID}`, HttpMethods.GET);

    return saveFunction(NOTE_ID)
      .then(
        response => expect(response).toBeTruthy(),
        () => fail('Unexpected error was thrown for http code 200!'),
      );
  });

  it('should throw an error when fetch failed - promise is rejected.', () => {
    const mockedFetch = mockRejectedFetch();
    const saveFunction = fetchWithIdFactory(mockedFetch, () => `test/${NOTE_ID}`, HttpMethods.GET);

    return saveFunction(NOTE_ID)
      .catch(reject => expect(reject).toBeTruthy());
  });
});

describe('FetchFactory', () => {
  it('should throw an error when promise is resolved but response.ok is false - error 500.', () => {
    const mockedFetch = mockResolvedFetch(HTTP_ERROR_STATUS, false);
    const saveFunction = fetchFactory<IServerNote>(mockedFetch, HttpMethods.GET);

    return saveFunction(POST_NOTE)
      .then(
        () => fail('Expected error was not throw for http code 500!'),
        error => expect(error).toBeTruthy()
      );
  });

  it('should return correct object when response.ok is true - status code 200.', () => {
    const mockedFetch = mockResolvedFetch(HTTP_SUCCESS_STATUS, true);
    const saveFunction = fetchFactory<IServerNote>(mockedFetch, HttpMethods.GET);

    return saveFunction()
      .then(
        response => expect(response).toBeTruthy(),
        () => fail('Unexpected error was thrown for http code 200!'),
      );
  });

  it('should throw an error when fetch failed - promise is rejected.', () => {
    const mockedFetch = mockRejectedFetch();
    const saveFunction = fetchFactory<IServerNote>(mockedFetch, HttpMethods.GET);

    return saveFunction(POST_NOTE)
      .catch(reject => expect(reject).toBeTruthy());
  });
});
