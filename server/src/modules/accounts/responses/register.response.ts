import FabulaMessage, {FabulaDataMessage, MakeMessage} from "../../../shared/common/responses/base.response";

export enum RegisterResponseEvents {
    RegisterSuccess = '[Server] Register Success',
    RegisterFailure = '[Server] Register Failure'
}

export class RegisterSuccess extends FabulaMessage {
    public event = RegisterResponseEvents.RegisterSuccess
}

export interface RegisterFailureData {
    email?: string;
    password?: string;
    other?: string
}

export class RegisterFailure extends FabulaDataMessage<RegisterFailureData> {
    public event = RegisterResponseEvents.RegisterFailure
}

export type RegisterResponse = MakeMessage<RegisterSuccess | RegisterFailure>;