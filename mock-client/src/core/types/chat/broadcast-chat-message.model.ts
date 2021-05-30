import { ChatMessageModel } from './chat-message.model';
import { BroadcastRange } from './broadcast-range.model';

export default class BroadcastChatMessageModel extends ChatMessageModel {
    public static TYPE_SELECTOR = 'BroadcastChatMessageDto';
    readonly type = BroadcastChatMessageModel.TYPE_SELECTOR;

    origin: {
        x: number;
        y: number;
    };
    range: BroadcastRange;

    constructor(values: Omit<BroadcastChatMessageModel, 'type'>) {
        super(values);
        this.origin = values.origin;
        this.range = values.range;
    }
}
