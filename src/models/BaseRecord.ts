import { Record } from 'immutable';

export const BaseRecord = <T>(defaultValues: object, name: string) => class extends Record(defaultValues, name) {
  constructor(params?: Partial<T>) {
    params ? super(params) : super();
  }

  with(values: Partial<T>): any {
    return this.merge(values) as this;
  }
};
