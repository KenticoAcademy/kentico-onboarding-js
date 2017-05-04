import { Record } from 'immutable';

interface IErrorMessage {
  readonly message: string;
}

const defaultValues: IErrorMessage = {
  message: '',
};

class ErrorMessage extends Record(defaultValues) implements IErrorMessage {
  readonly message: string;
}

export { ErrorMessage };
