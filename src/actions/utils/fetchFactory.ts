import { headerBase } from './headerBase';

const validateResponse = async (response: Response): Promise<string> => {
  switch (response.status) {
    case 400:
      const json = await response.json();
      return json.ModelState;

    case 404:
      return 'Requested item was not found.';

    case 504:
      return 'Request has timed out, please repeat later.';

    default:
      return 'Unknown error, team of garden gnomes is trying to resolve it.';
  }
};

export const fetchFactory = (
  fetch: (input: string, init: RequestInit) => Promise<Response>,
  url: string,
  headers: RequestInit,
): Promise<Response> =>
    fetch(url, {...headerBase, ...headers})
      .then(async response => {
          if (!response.ok) {
            throw Error(await validateResponse(response));
          }
          return response;
        },
      );
