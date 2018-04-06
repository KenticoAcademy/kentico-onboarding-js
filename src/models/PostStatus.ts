import { Record } from 'immutable';

const emptyStatus: IPostStatus = {
  hasError: false,
  message: ''
};

export interface IPostStatus {
  readonly hasError: boolean;
  readonly message: string;
}

export class PostStatus extends Record(emptyStatus) implements IPostStatus {
  hasError: boolean;
  message: string;

  constructor(params?: Partial<IPostStatus>) {
    params ? super(params) : super();
  }

  with(values: Partial<IPostStatus>) {
    return this.merge(values) as this;
  }
}
