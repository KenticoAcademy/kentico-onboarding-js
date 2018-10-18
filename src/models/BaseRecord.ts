import {Record} from 'immutable';


export const BaseRecord = <T>(defaultValues: {}, name?: string) => class extends Record(defaultValues, name) {
  constructor(params: Partial<T>) {
    super(params);
  }

  with(update: Partial<T>) {
    return this.merge(update) as this;
  }
};
