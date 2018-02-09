export enum FetchItemsState {
  INITIAL = 'Initial',
  REQUESTED = 'Requested',
  RECEIVED = 'Received',
  FAILED = 'Failed',
}

export const AllFetchItemsStates = [
  FetchItemsState.INITIAL,
  FetchItemsState.REQUESTED,
  FetchItemsState.RECEIVED,
  FetchItemsState.FAILED,
];
