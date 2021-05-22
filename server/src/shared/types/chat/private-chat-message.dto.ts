import { ChatMessageDto } from './chat-message.dto';

export default class PrivateChatMessageDto extends ChatMessageDto {
    public static TYPE_SELECTOR = 'PrivateChatMessageDto';
    readonly type = PrivateChatMessageDto.TYPE_SELECTOR;

    character: string;

    constructor(values: Omit<PrivateChatMessageDto, 'type'>) {
        super(values);
        this.character = values.character;
    }
}
