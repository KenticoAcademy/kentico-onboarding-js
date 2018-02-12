import 'isomorphic-fetch';

const checkResponseStatus = (response: Response): Response => {
  if (!response.ok) {
    throw Error('Server error. Error  ' + response.status + ' ' + response.statusText);
  } else {
    return response;
  }
};

export const fetchFactory = (injectedFetch: (apiAddress: string, initializationObject?: object) => Promise<Response>) =>
  (apiAddress: string, httpMethod: HttpMethods, data?: object): Promise<Response> => {

  const requestInitialization = {
    method: httpMethod,
    body: JSON.stringify(data),
    headers: {'content-type': 'application/json'},
  };

  return injectedFetch(apiAddress, requestInitialization)
    .then(response => checkResponseStatus(response));
};
