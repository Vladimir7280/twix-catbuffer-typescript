import { Address } from './Address';
import { Serializer } from './Serializer';
export interface MultisigEntryParams {
    version: number;
    minApproval: number;
    minRemoval: number;
    accountAddress: Address;
    cosignatoryAddresses: Address[];
    multisigAddresses: Address[];
}
export declare class MultisigEntry implements Serializer {
    readonly version: number;
    readonly minApproval: number;
    readonly minRemoval: number;
    readonly accountAddress: Address;
    readonly cosignatoryAddresses: Address[];
    readonly multisigAddresses: Address[];
    constructor({ version, minApproval, minRemoval, accountAddress, cosignatoryAddresses, multisigAddresses }: MultisigEntryParams);
    static deserialize(payload: Uint8Array): MultisigEntry;
    get size(): number;
    serialize(): Uint8Array;
}
