import {FabulaDataMessage} from "../../src/shared/common/responses/base.response";

export type DemistifyGateway<Gateway, Response = FabulaDataMessage<any>> = {
    [Key in keyof Gateway]: Gateway[Key] extends (...args: infer Params) => infer Return ? (...args: Params) =>Promise<Response> : Gateway[Key];
}