export enum ListSorting {
  CreatedTime,
  LastUpdateTime
}

export const getListSortingArray: () => ListSorting[] = () => [ListSorting.CreatedTime, ListSorting.LastUpdateTime];
