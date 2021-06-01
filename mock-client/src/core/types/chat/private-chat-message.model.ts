import { ChatMessageModel } from './chat-message.model';

export default class PrivateChatMessageModel extends ChatMessageModel {
    public static TYPE_SELECTOR = 'PrivateChatMessageModel';
    readonly type = PrivateChatMessageModel.TYPE_SELECTOR;

    character: string;

    constructor(values: Omit<PrivateChatMessageModel, 'type'>) {
        super(values);
        this.character = values.character;
    }
}
