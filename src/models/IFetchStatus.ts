export interface IFetchStatus {
  readonly isFetching: boolean;
  readonly hasError: boolean;
  readonly errorMessage: string;
}
