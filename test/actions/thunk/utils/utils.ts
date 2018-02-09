import { IAction } from '../../../../src/models/interfaces/IAction';
import Mock = jest.Mock;

export const fetchReturnsOkResponseFactory = (body = {}) => jest
  .fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(body),
    })
  );

export const fetchAlwaysFailFactory = (error: Error = new Error()) => jest
  .fn(() => Promise.reject(error));

export const fakeFunction = jest.fn();
export const dispatchFactory = () => jest.fn();

export const handleErrors = jest.fn((res: Response) => res);

const getFirstArgumentOfCalls = <T>(mockedFunction: Mock<T>) =>
  mockedFunction
    .mock
    .calls
    .map(call => call[0]);

export const assertThatDispatchWasCalledWithActions = (dispatchableAction: (dispatch: Mock<{}>) => Promise<IAction | void>, dispatch: Mock<{}>, expectedActions: string[]) =>
  dispatchableAction(dispatch)
    .then(() => {
      const callArguments = getFirstArgumentOfCalls(dispatch);

      expectedActions.forEach(act =>
        expect(callArguments)
          .toContain(act));
    });
