import { MessageType } from '../enums/MessageType';

export interface IMessage {
  readonly type: MessageType;
  readonly content: string;
}
