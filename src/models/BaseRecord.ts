import { Record } from 'immutable';

export const BaseRecord = (defaultValues: {}) => class extends Record(defaultValues){
  with(update: Partial<this>) {
    return this.merge(update) as this;
  }
};
