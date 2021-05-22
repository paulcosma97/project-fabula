import { ChatMessageDto } from './chat-message.dto';

export default class PrivateChatMessageDto extends ChatMessageDto {
    public static TYPE_SELECTOR = 'PrivateChatMessageDto';
    readonly type = PrivateChatMessageDto.TYPE_SELECTOR;

    account: string;

    constructor(values: Partial<PrivateChatMessageDto>) {
        super(values);
        this.account = values.account;
    }
}
