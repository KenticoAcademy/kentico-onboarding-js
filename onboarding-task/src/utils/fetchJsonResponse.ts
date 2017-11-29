export interface IFetchDependencies {
  fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
  input: RequestInfo;
  init?: RequestInit;
}

export const fetchJsonResponse = async (dependencies: IFetchDependencies): Promise<any> => {
    const response = await dependencies.fetch(dependencies.input, dependencies.init);

    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return await response.json();
};
