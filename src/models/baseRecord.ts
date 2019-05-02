import { Record } from 'immutable';

export function baseRecord<T>(defaultValues: T, name: string): any {
  class BaseItem extends Record(defaultValues, name) {
    constructor(props: Partial<T>) {
      super(props);
    }

    with(entity: Partial<T>): this {
      return this.merge(entity) as this;
    }
  }

  return BaseItem;
}
