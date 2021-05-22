import { ChatMessageDto } from './chat-message.dto';
import Vector from '../math.types';
import { BroadcastRange } from './broadcast-range.enum';

export default class BroadcastChatMessageDto extends ChatMessageDto {
    public static TYPE_SELECTOR = 'BroadcastChatMessageDto';
    readonly type = BroadcastChatMessageDto.TYPE_SELECTOR;

    origin: Vector;
    range: BroadcastRange;

    constructor(values: Omit<BroadcastChatMessageDto, 'type'>) {
        super(values);
        this.origin = values.origin;
        this.range = values.range;
    }
}
