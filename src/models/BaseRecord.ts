import { Record } from 'immutable';

export function BaseRecord<T>(defaultValues: T, name: string) {
  class BaseRecordClass extends Record(defaultValues, name) {
    constructor(parameters?: Partial<T>) {
      parameters ? super(parameters) : super();
    }

    with(parameters: Partial<T>) {
      return this.merge(parameters) as this;
    }
  }

  return BaseRecordClass;
}
