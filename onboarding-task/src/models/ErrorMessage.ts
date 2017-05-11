import { Record } from 'immutable';

interface IErrorMessage {
  readonly id: string;
  readonly itemUeid: string;
  readonly message: string;
}

const defaultValues: IErrorMessage = {
  message: '',
  id: '',
  itemUeid: '',
};

class ErrorMessage extends Record(defaultValues) implements IErrorMessage {
  readonly id: string;
  readonly itemUeid: string;
  readonly message: string;
}

export { ErrorMessage };
