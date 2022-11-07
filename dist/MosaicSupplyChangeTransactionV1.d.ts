import { Amount } from './Amount';
import { MosaicSupplyChangeAction } from './MosaicSupplyChangeAction';
import { NetworkType } from './NetworkType';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { Signature } from './Signature';
import { Timestamp } from './Timestamp';
import { TransactionType } from './TransactionType';
import { UnresolvedMosaicId } from './UnresolvedMosaicId';
export interface MosaicSupplyChangeTransactionV1Params {
    signature: Signature;
    signerPublicKey: PublicKey;
    version: number;
    network: NetworkType;
    type: TransactionType;
    fee: Amount;
    deadline: Timestamp;
    mosaicId: UnresolvedMosaicId;
    delta: Amount;
    action: MosaicSupplyChangeAction;
}
export declare class MosaicSupplyChangeTransactionV1 implements Serializer {
    readonly TRANSACTION_VERSION = 1;
    readonly TRANSACTION_TYPE = 16973;
    readonly signature: Signature;
    readonly signerPublicKey: PublicKey;
    readonly version: number;
    readonly network: NetworkType;
    readonly type: TransactionType;
    readonly fee: Amount;
    readonly deadline: Timestamp;
    readonly mosaicId: UnresolvedMosaicId;
    readonly delta: Amount;
    readonly action: MosaicSupplyChangeAction;
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, mosaicId, delta, action, }: MosaicSupplyChangeTransactionV1Params);
    static deserialize(payload: Uint8Array): MosaicSupplyChangeTransactionV1;
    get size(): number;
    serialize(): Uint8Array;
}
