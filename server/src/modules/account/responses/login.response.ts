import FabulaMessage, { FabulaDataMessage, MakeMessage } from '../../../shared/common/responses/base.response';

export enum LoginResponseEvents {
    LoginSuccess = '[Server] Login Success',
    LoginFailure = '[Server] Login Failure',
}

export enum LoginFailureReason {
    WrongEmailPasswordCombination = 0,
}

export class LoginSuccess extends FabulaMessage {
    public event = LoginResponseEvents.LoginSuccess;
}

export class LoginFailure extends FabulaDataMessage<LoginFailureReason> {
    public event = LoginResponseEvents.LoginFailure;
}

export type LoginResponse = MakeMessage<LoginSuccess | LoginFailure>;
