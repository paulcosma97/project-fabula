import { FabulaDataMessage } from '../../src/shared/common/responses/base.response';

export type DemistifyGateway<Gateway, Response = FabulaDataMessage<any>> = {
    [Key in keyof Gateway]: Gateway[Key] extends (...args: infer Params) => any
        ? (...args: Params) => Promise<Response>
        : Gateway[Key];
};
