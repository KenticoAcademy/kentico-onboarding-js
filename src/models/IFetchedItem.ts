export interface IFetchedItem {
  readonly id: Uuid;
  readonly text: string;
  readonly creationTime: string;
  readonly lastUpdateTime: string;
}
