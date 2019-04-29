export enum ListSorting {
  CreatedTime = 'CreatedTime',
  LastUpdateTime = 'LastUpdateTime'
}

export const getListSortingArray = (): ListSorting[] => [ListSorting.CreatedTime, ListSorting.LastUpdateTime];
