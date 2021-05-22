export class ChatMessageDto {
    public static TYPE_SELECTOR = 'ChatMessageDto';
    readonly type: string = ChatMessageDto.TYPE_SELECTOR;

    message: string;

    constructor(values: Omit<ChatMessageDto, 'type'>) {
        this.message = values.message;
    }
}
