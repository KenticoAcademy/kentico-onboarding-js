export const parseResponse = (errorMessage: string) => (response: Response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(new Error(response.statusText + errorMessage));
};
