import { MessageType } from '../constants/MessageType';

export interface IMessage {
  readonly type: MessageType;
  readonly content: string;
}
