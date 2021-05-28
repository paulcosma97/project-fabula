import {applyDecorators, Logger, Type} from "@nestjs/common";
import {SubscribeMessage} from "@nestjs/websockets";

export default abstract class FabulaMessage {
    public event: string;
}

export abstract class FabulaDataMessage<Data> extends FabulaMessage {
    constructor(public data: Data) {
        super()
    }
}

export class InternalServerErrorResponse extends FabulaDataMessage<string> {
    public event = '[Server] ISE';
}

export type MakeMessage<T extends FabulaMessage> = T | InternalServerErrorResponse;
export async function makeMessage<T = null>(messageGenerator: Function, forMessageEvent: string, staticSuccessMessage?: Type<FabulaMessage>): Promise<FabulaMessage | void> {
    try {
        const message = await messageGenerator();
        if (message) {
            return message;
        }

        if (staticSuccessMessage) {
            return new staticSuccessMessage();
        }
    } catch (e) {
        if (e instanceof FabulaMessage) {
            return e;
        }

        Logger.error(`Failed to respond to message: ${JSON.stringify(forMessageEvent)}.`, (e as Error).stack, 'makeMessage');
        return new InternalServerErrorResponse(forMessageEvent) as unknown as FabulaDataMessage<T>;
    }
}

export const ApplyDefaultErrorMessage = (event: string, staticSuccessMessage?: Type<FabulaMessage>) => (classInstance: any, methodName: string, descriptor: any): void => {
    const originalMethod: Function = descriptor.value;
    descriptor.value = new Proxy(originalMethod, {
        apply(target: Function, thisArg: any, argArray: any[]): any {
            const messageGenerator = () => target.apply(thisArg, argArray);
            return makeMessage(messageGenerator, event, staticSuccessMessage);
        }
    })
}

export const FabulaGateway = (event: string, staticSuccessMessage?: Type<FabulaMessage>) => {
    return applyDecorators(
        ApplyDefaultErrorMessage(event, staticSuccessMessage),
        SubscribeMessage(event),
    )
}