export enum ListStatus {
  IsNotInitialized = 'IsNotInitialized',
  IsInitialized = 'IsInitialized',
  IsBeingInitialized = 'IsBeingInitialized',
  InitializationFailed = 'InitializationFailed',
}

export const getListStatusArray = (): ListStatus[] => [ListStatus.IsInitialized, ListStatus.IsNotInitialized, ListStatus.IsBeingInitialized, ListStatus.InitializationFailed];
