import { Amount } from './Amount';
import { BlockDuration } from './BlockDuration';
import { MosaicFlags } from './MosaicFlags';
import { MosaicId } from './MosaicId';
import { MosaicNonce } from './MosaicNonce';
import { NetworkType } from './NetworkType';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { Signature } from './Signature';
import { Timestamp } from './Timestamp';
import { TransactionType } from './TransactionType';
export interface MosaicDefinitionTransactionV1Params {
    signature: Signature;
    signerPublicKey: PublicKey;
    version: number;
    network: NetworkType;
    type: TransactionType;
    fee: Amount;
    deadline: Timestamp;
    id: MosaicId;
    duration: BlockDuration;
    nonce: MosaicNonce;
    flags: MosaicFlags[];
    divisibility: number;
}
export declare class MosaicDefinitionTransactionV1 implements Serializer {
    readonly TRANSACTION_VERSION = 1;
    readonly TRANSACTION_TYPE = 16717;
    readonly signature: Signature;
    readonly signerPublicKey: PublicKey;
    readonly version: number;
    readonly network: NetworkType;
    readonly type: TransactionType;
    readonly fee: Amount;
    readonly deadline: Timestamp;
    readonly id: MosaicId;
    readonly duration: BlockDuration;
    readonly nonce: MosaicNonce;
    readonly flags: MosaicFlags[];
    readonly divisibility: number;
    constructor({ signature, signerPublicKey, version, network, type, fee, deadline, id, duration, nonce, flags, divisibility, }: MosaicDefinitionTransactionV1Params);
    static deserialize(payload: Uint8Array): MosaicDefinitionTransactionV1;
    get size(): number;
    serialize(): Uint8Array;
}
