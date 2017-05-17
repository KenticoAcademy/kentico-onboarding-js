export interface IItemServerModel {
  readonly id: string;
  readonly ueid: string;
  readonly value: string;
  // properties below are not used within the application
  readonly created: any;
  readonly lastUpdated: any;
}
