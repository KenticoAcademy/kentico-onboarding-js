import { Record } from 'immutable';

export const BaseRecord = (defaultValues: {}) => class<T> extends Record(defaultValues){
  with(update: Partial<T>) {
    return this.merge(update) as this;
  }
};
