import { Record } from 'immutable';

export const BaseRecord = <TClass>(defaultValues: TClass) =>
  class extends Record(defaultValues) {
    constructor(params: Partial<TClass> = defaultValues) {
      params ? super(params) : super();
    }

    with(values: Partial<TClass>): TClass & this {
      return this.merge(values) as any;
    }
  };
