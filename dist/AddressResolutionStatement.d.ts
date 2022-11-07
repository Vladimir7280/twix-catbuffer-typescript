import { AddressResolutionEntry } from './AddressResolutionEntry';
import { Serializer } from './Serializer';
import { UnresolvedAddress } from './UnresolvedAddress';
export interface AddressResolutionStatementParams {
    unresolved: UnresolvedAddress;
    resolutionEntries: AddressResolutionEntry[];
}
export declare class AddressResolutionStatement implements Serializer {
    readonly unresolved: UnresolvedAddress;
    readonly resolutionEntries: AddressResolutionEntry[];
    constructor({ unresolved, resolutionEntries }: AddressResolutionStatementParams);
    static deserialize(payload: Uint8Array): AddressResolutionStatement;
    get size(): number;
    serialize(): Uint8Array;
}
