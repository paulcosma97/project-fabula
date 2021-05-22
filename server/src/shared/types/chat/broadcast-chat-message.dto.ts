import { ChatMessageDto } from './chat-message.dto';
import { Point } from '../math.types';

export default class BroadcastChatMessageDto extends ChatMessageDto {
    public static TYPE_SELECTOR = 'BroadcastChatMessageDto';
    readonly type = BroadcastChatMessageDto.TYPE_SELECTOR;

    origin: Point<string>;
    range: string;

    constructor(values: Partial<BroadcastChatMessageDto>) {
        super(values);
        this.origin = values.origin;
        this.range = values.range;
    }
}
