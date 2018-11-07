import { headerBase } from './headerBase';
import { GATEWAY_TIMEOUT_MESSAGE, NOT_FOUND_MESSAGE, CONNECTION_FAILED } from './errorMessages';

const validateResponse = async (response: Response): Promise<string> => {
  switch (response.status) {
    case 400:
      const json = await response.json();
      return JSON.stringify(json.ModelState);

    case 404:
      return NOT_FOUND_MESSAGE;

    case 504:
      return GATEWAY_TIMEOUT_MESSAGE;

    default:
      return response.statusText;
  }
};

export const fetchFactory = (
  fetch: Fetch,
  url: string,
  headers: RequestInit,
): Promise<Response> =>
    fetch(url, {...headerBase, ...headers})
      .then(
        async response => {
          if (!response.ok) {
            throw Error(await validateResponse(response));
          }
          return response;
        },
        () => {
            throw Error(CONNECTION_FAILED);
        },
      );
