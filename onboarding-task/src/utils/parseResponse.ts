export const parseResponse = (errorMessage: string) => (response: Response): Promise<any> => response
  .json()
  .catch(() => Promise.reject(new Error(response.statusText + ': ' + errorMessage)))
  .then((data: any) => response.ok
    ? data
    : Promise.reject(new Error(response.statusText + ': ' + data.modelState.value)));
