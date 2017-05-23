export const parseResponse = (errorMessage: string) => (response: Response): Promise<any> => {
  if (response.ok) {
    return response.json();
  }
  return response.json().catch(() =>
    Promise.reject(new Error(response.statusText + ': ' + errorMessage))
  ).then((data: any) =>
    Promise.reject(new Error(response.statusText + ': ' + data.modelState.value.toString()))
  );
};
