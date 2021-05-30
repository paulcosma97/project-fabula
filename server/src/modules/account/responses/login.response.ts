import FabulaMessage, { FabulaDataMessage, MakeMessage } from '../../../shared/common/responses/base.response';

export enum LoginResponseEvents {
    LoginSuccess = '[Server] Login Success',
    LoginFailure = '[Server] Login Failure',
}

export class LoginSuccess extends FabulaMessage {
    public event = LoginResponseEvents.LoginSuccess;
}

export interface LoginFailureData {
    reason: string;
}

export class LoginFailure extends FabulaDataMessage<LoginFailureData> {
    public event = LoginResponseEvents.LoginFailure;
}

export type LoginResponse = MakeMessage<LoginSuccess | LoginFailure>;
