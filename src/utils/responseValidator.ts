import { IFetchedItem } from '../models/IFetchedItem';

const errorMessage = 'Invalid response.';

function validateResponse<Result>(expectedStatusCode: number): (response: Response) => Promise<Result> {
  return (response: Response) => {
    if (response.status === expectedStatusCode && response.ok)
      return response.json();
    return Promise.reject(new Error(errorMessage));
  };
}

export const validateDeleteResponse = (response: Response): void => {
  if (!response.ok || response.status !== 204) {
    throw errorMessage;
  }
};

export const validatePostResponse = validateResponse<IFetchedItem>(201);
export const validatePutResponse = validateResponse<IFetchedItem>(200);
export const validateGetResponse = validateResponse<ReadonlyArray<IFetchedItem>>(200);
