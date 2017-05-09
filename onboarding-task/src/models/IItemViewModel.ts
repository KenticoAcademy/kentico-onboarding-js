export interface IItemViewModel {
  readonly id: string;
  readonly value: string;
  readonly index: number;
  readonly isInEditMode: boolean;
  readonly isSavedInDatabase: boolean;
}
