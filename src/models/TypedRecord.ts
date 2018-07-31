import { Record } from 'immutable';

export const TypedRecord = <ClassType, IClassType>(emptyRecord: IClassType, name: string) => {
  return class extends Record(emptyRecord, name) {
    with(item: Partial<IClassType>): ClassType {
      return super.merge(item) as any as ClassType;
    }
  };
};
