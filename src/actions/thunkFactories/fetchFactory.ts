import { GATEWAY_TIMEOUT_MESSAGE, NOT_FOUND_MESSAGE, CONNECTION_FAILED } from '../utils/errorMessages';

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

export type FetchConfig = {
  id?: Guid;
  data?: BodyInit;
};

export const fetchFactory = (
  fetch: Fetch,
  urlBase: string,
  headerBase: RequestInit,
) =>
  (headers: RequestInit) =>
    (config: FetchConfig): Promise<Response> =>
      fetch(urlBase + `/${!config.id ? '' : config.id}`, {...headerBase, ...headers, body: config.data})
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
