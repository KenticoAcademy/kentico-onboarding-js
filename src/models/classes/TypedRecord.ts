import { Record } from 'immutable';

export const TypedRecord = <TClass>(defaultValues: TClass) =>
  class extends Record((<any>Object).assign({}, defaultValues)) {
    constructor(params: Partial<TClass> = defaultValues) {
      super(params);
    }

    with(params: Partial<TClass>) {
      return super.merge(params) as this;
    }
  };
