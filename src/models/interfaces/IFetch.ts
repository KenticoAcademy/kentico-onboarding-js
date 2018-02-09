export interface IFetch {
  (input: RequestInfo, init?: RequestInit): Promise<Response>;
}
