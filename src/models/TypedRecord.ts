import { Record } from 'immutable';

export const TypedRecord = <RecordType, DataType>(emptyRecord: DataType, name: string) => class extends Record(emptyRecord, name) {
  constructor(item?: Partial<DataType>) {
    if (item) {
      super(item);
    } else {
      super();
    }
  }

  with(item: Partial<DataType>): RecordType {
    return super.merge(item) as any as RecordType;
  }
};
