import { NetworkType } from './NetworkType';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { TransactionType } from './TransactionType';
import { UnresolvedAddress } from './UnresolvedAddress';
export interface EmbeddedMultisigAccountModificationTransactionV1Params {
    signerPublicKey: PublicKey;
    version: number;
    network: NetworkType;
    type: TransactionType;
    minRemovalDelta: number;
    minApprovalDelta: number;
    addressAdditions: UnresolvedAddress[];
    addressDeletions: UnresolvedAddress[];
}
export declare class EmbeddedMultisigAccountModificationTransactionV1 implements Serializer {
    readonly TRANSACTION_VERSION = 1;
    readonly TRANSACTION_TYPE = 16725;
    readonly signerPublicKey: PublicKey;
    readonly version: number;
    readonly network: NetworkType;
    readonly type: TransactionType;
    readonly minRemovalDelta: number;
    readonly minApprovalDelta: number;
    readonly addressAdditions: UnresolvedAddress[];
    readonly addressDeletions: UnresolvedAddress[];
    constructor({ signerPublicKey, version, network, type, minRemovalDelta, minApprovalDelta, addressAdditions, addressDeletions, }: EmbeddedMultisigAccountModificationTransactionV1Params);
    static deserialize(payload: Uint8Array): EmbeddedMultisigAccountModificationTransactionV1;
    get size(): number;
    serialize(): Uint8Array;
}
