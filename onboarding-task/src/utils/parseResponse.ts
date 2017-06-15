export const parseResponse = (errorMessage: string) => (response: Response): Promise<any> => {
  return response.json().catch(() =>
    Promise.reject(new Error(response.statusText + ': ' + errorMessage))
  ).then((data: any) => {
      return response.ok ?
        data : Promise.reject(new Error(response.statusText + ': ' + data.modelState.value.toString()));
    }
  );
};
