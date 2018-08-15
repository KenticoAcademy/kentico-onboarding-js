import { Record } from 'immutable';

export const TypedRecord = <TRecord, TData>(emptyRecord: TData, name: string) => class extends Record(emptyRecord, name) {
  constructor(item?: Partial<TData>) {
    if (item) {
      super(item);
    } else {
      super();
    }
  }

  with(item: Partial<TData>): TRecord {
    return super.merge(item) as any as TRecord;
  }
};
