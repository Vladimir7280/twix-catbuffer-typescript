import { Amount } from './Amount';
import { NetworkType } from './NetworkType';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { Signature } from './Signature';
import { Timestamp } from './Timestamp';
import { TransactionType } from './TransactionType';
import { UnresolvedAddress } from './UnresolvedAddress';
export interface MultisigAccountModificationTransactionV1Params {
    signature: Signature;
    signerPublicKey: PublicKey;
    version: number;
    network: NetworkType;
    type: TransactionType;
    fee: Amount;
    deadline: Timestamp;
    minRemovalDelta: number;
    minApprovalDelta: number;
    addressAdditions: UnresolvedAddress[];
    addressDeletions: UnresolvedAddress[];
}
export declare class MultisigAccountModificationTransactionV1 implements Serializer {
    readonly TRANSACTION_VERSION = 1;
    readonly TRANSACTION_TYPE = 16725;
    readonly signature: Signature;
    readonly signerPublicKey: PublicKey;
    readonly version: number;
    readonly network: NetworkType;
    readonly type: TransactionType;
    readonly fee: Amount;
    readonly deadline: Timestamp;
    readonly minRemovalDelta: number;
    readonly minApprovalDelta: number;
    readonly addressAdditions: UnresolvedAddress[];
    readonly addressDeletions: UnresolvedAddress[];
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, minRemovalDelta, minApprovalDelta, addressAdditions, addressDeletions, }: MultisigAccountModificationTransactionV1Params);
    static deserialize(payload: Uint8Array): MultisigAccountModificationTransactionV1;
    get size(): number;
    serialize(): Uint8Array;
}
