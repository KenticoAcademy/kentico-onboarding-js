import { Record } from 'immutable';

export const TypedRecord = <TValues>(values: TValues) =>
  class extends Record(values) {
    constructor(initialValues?: Partial<TValues>) {
      initialValues ? super(initialValues) : super();
    }

    with(objects: Partial<TValues>): this {
      return this.merge(objects) as this;
    }
  };
