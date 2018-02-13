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
export const dispatch = jest.fn();

const resetDispatch = () =>
  dispatch.mockReset();

export const fakeHandleErrors = jest.fn((res: Response) => res);

const getFirstArgumentOfCalls = <T>(mockedFunction: Mock<T>): T[] =>
  mockedFunction
    .mock
    .calls
    .map(call => call[0]);

export const assertThatDispatchWasCalledWithArgumentsInGiveOrder = (dispatchableAction: (dispatch: Mock<{}>) => Promise<any>, expectedActions: string[]) => {
  resetDispatch();

  return dispatchableAction(dispatch)
    .then(() => {
      const callArguments: any = getFirstArgumentOfCalls(dispatch);

      expect(callArguments)
        .toEqual(expectedActions);
    });
};
