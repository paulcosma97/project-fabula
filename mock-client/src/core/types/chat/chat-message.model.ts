export class ChatMessageModel {
    public static TYPE_SELECTOR = 'ChatMessageDto';
    readonly type: string = ChatMessageModel.TYPE_SELECTOR;

    message: string;

    constructor(values: Omit<ChatMessageModel, 'type'>) {
        this.message = values.message;
    }
}
