import { IMessage } from './IMessage';
import { MessageType } from '../constants/MessageType';
import { Record } from 'immutable';

const defaultMessage: IMessage = {
  type: MessageType.Empty,
  content: '',
};

export class Message extends Record(defaultMessage) implements IMessage {
  readonly type: MessageType;
  readonly content: string;

  constructor(params: Partial<IMessage> = defaultMessage) {
    super(params);
  }

  with = (params: Partial<IMessage>): IMessage =>
    super.merge(params) as this;
}
