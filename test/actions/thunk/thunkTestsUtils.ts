import Mock = jest.Mock;
import { IHttpClient } from '../../../src/models/interfaces/IHttpClient';

export const httpClientSuccessFactory = <T>(body: T | {} = {}): IHttpClient => {
  const resolve = () => Promise.resolve<any>(body);

  return ({
    get: resolve,
    delete: () => Promise.resolve(),
    post: resolve,
    patch: resolve,
    put: resolve,
  });
};

const reject = () =>
  Promise.reject({});

export const httpClientFailure: IHttpClient = ({
  get: reject,
  delete: reject,
  post: reject,
  patch: reject,
  put: reject,
});

export const fakeFunction = jest.fn();

export const getDispatchedActionTypes = <TActionType>(mockedThunkAction: Mock<TActionType>): string[] =>
  mockedThunkAction
    .mock
    .calls
    .map(call => call[0].type);
