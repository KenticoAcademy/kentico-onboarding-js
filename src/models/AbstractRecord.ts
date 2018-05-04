import { Record } from 'immutable';

export const AbstractRecord = <TType>(defaultValues: TType) =>
  class extends Record(defaultValues) {
    constructor(params: Partial<TType> = defaultValues) {
      params
        ? super(params)
        : super();
    }

    with(values: Partial<TType>): TType & this {
      return this.merge(values) as TType & this;
    }
  };
