export class ChatMessageDto {
    public static TYPE_SELECTOR = 'ChatMessageDto';
    readonly type: string = ChatMessageDto.TYPE_SELECTOR;

    message: string;

    constructor(values: Partial<ChatMessageDto>) {
        this.message = values.message;
    }
}
