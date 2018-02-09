import { IMessage } from '../interfaces/IMessage';
import { MessageType } from '../enums/MessageType';
import { TypedRecord } from './TypedRecord';

const defaultMessage: IMessage = {
  type: MessageType.Empty,
  content: '',
};

export class Message extends TypedRecord(defaultMessage) implements IMessage {
  readonly type: MessageType;
  readonly content: string;
}

