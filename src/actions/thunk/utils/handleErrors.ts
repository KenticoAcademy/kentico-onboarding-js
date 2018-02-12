export const handleErrors = (response: Response): Response => {
  if (!response.ok) {
    throw Error(response.statusText);
  }

  return response;
};
