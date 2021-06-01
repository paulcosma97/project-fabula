import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import CommandLineComponent from './command-line.component';
import { ClientResponses, ClientResponsesKeyValues } from '../../types/ws/client-responses.enum';
import WebsocketServiceInstance from '../../services/websocket.service';
import PrivateChatMessageModel from '../../types/chat/private-chat-message.model';
import BroadcastChatMessageModel from '../../types/chat/broadcast-chat-message.model';
import { BroadcastRange } from '../../types/chat/broadcast-range.model';
import { ChatMessageModel } from '../../types/chat/chat-message.model';
import { LoginModel } from '../../types/auth/login.model';
import { RegisterModel } from '../../types/auth/register.model';

const CommandLineSuggestions = {
    [ClientResponses.PING]: '',
    [ClientResponses.CHAT]: JSON.stringify(new BroadcastChatMessageModel({ message: 'message' } as any)),
    [ClientResponses.LOGIN]: JSON.stringify({ email: 'boy@gmail.com', password: 'bestboi' } as LoginModel),
    [ClientResponses.REGISTER]: JSON.stringify({ email: 'boy@gmail.com', password: 'bestboi' } as RegisterModel),
};

export default function CommandLineContainer() {
    const [commandLine, setCommandLine] = useState('');
    const [eventType, setEventType] = useState(ClientResponses.PING);

    const onSend = async () => {
        switch (eventType) {
            case ClientResponses.PING:
                await WebsocketServiceInstance.ping();
                return;
            case ClientResponses.CHAT:
                const chatPayload: ChatMessageModel = JSON.parse(commandLine);
                if (chatPayload.type === BroadcastChatMessageModel.TYPE_SELECTOR) {
                    await WebsocketServiceInstance.chat(
                        new BroadcastChatMessageModel({
                            ...chatPayload,
                            origin: { x: 0, y: 0 },
                            range: BroadcastRange.ImmediateArea,
                        }),
                    );
                } else {
                    await WebsocketServiceInstance.chat(new PrivateChatMessageModel({ ...chatPayload } as any));
                }
                return;
            case ClientResponses.LOGIN:
                const loginPayload: LoginModel = JSON.parse(commandLine);
                await WebsocketServiceInstance.login(loginPayload);
                return;
            case ClientResponses.REGISTER:
                const registerPayload: RegisterModel = JSON.parse(commandLine);
                await WebsocketServiceInstance.register(registerPayload);
                return;
            default:
                return;
        }
    };
    const onSetEventTypeChanged = (value: ClientResponses): void => {
        setCommandLine(CommandLineSuggestions[value]);
        setEventType(value);
    };
    return (
        <Container maxWidth={'xl'}>
            <CommandLineComponent
                value={commandLine}
                valueChanged={setCommandLine}
                selectValue={eventType}
                selectChanged={onSetEventTypeChanged}
                selectOptions={ClientResponsesKeyValues}
                send={onSend}
            />
        </Container>
    );
}
