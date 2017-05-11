import { Record } from 'immutable';

interface IErrorMessage {
  readonly id: string;
  readonly guid: string;
  readonly message: string;
}

const defaultValues: IErrorMessage = {
  message: '',
  id: '',
  guid: '',
};

class ErrorMessage extends Record(defaultValues) implements IErrorMessage {
  readonly id: string;
  readonly guid: string;
  readonly message: string;
}

export { ErrorMessage };
