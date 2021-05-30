import FabulaMessage, { FabulaDataMessage, MakeMessage } from '../../../shared/common/responses/base.response';

export enum RegisterResponseEvents {
    RegisterSuccess = '[Server] Register Success',
    RegisterFailure = '[Server] Register Failure',
}

export class RegisterSuccess extends FabulaMessage {
    public event = RegisterResponseEvents.RegisterSuccess;
}

export enum RegisterFailureReason {
    EmailAlreadyExists = 0,
    InvalidPassword = 1,
    InvalidEmail = 2,
}

export class RegisterFailure extends FabulaDataMessage<RegisterFailureReason> {
    public event = RegisterResponseEvents.RegisterFailure;
}

export type RegisterResponse = MakeMessage<RegisterSuccess | RegisterFailure>;
