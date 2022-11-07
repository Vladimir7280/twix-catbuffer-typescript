import { BlockDuration } from './BlockDuration';
import { MosaicFlags } from './MosaicFlags';
import { MosaicId } from './MosaicId';
import { MosaicNonce } from './MosaicNonce';
import { NetworkType } from './NetworkType';
import { PublicKey } from './PublicKey';
import { Serializer } from './Serializer';
import { TransactionType } from './TransactionType';
export interface EmbeddedMosaicDefinitionTransactionV1Params {
    signerPublicKey: PublicKey;
    version: number;
    network: NetworkType;
    type: TransactionType;
    id: MosaicId;
    duration: BlockDuration;
    nonce: MosaicNonce;
    flags: MosaicFlags[];
    divisibility: number;
}
export declare class EmbeddedMosaicDefinitionTransactionV1 implements Serializer {
    readonly TRANSACTION_VERSION = 1;
    readonly TRANSACTION_TYPE = 16717;
    readonly signerPublicKey: PublicKey;
    readonly version: number;
    readonly network: NetworkType;
    readonly type: TransactionType;
    readonly id: MosaicId;
    readonly duration: BlockDuration;
    readonly nonce: MosaicNonce;
    readonly flags: MosaicFlags[];
    readonly divisibility: number;
    constructor({ signerPublicKey, version, network, type, id, duration, nonce, flags, divisibility, }: EmbeddedMosaicDefinitionTransactionV1Params);
    static deserialize(payload: Uint8Array): EmbeddedMosaicDefinitionTransactionV1;
    get size(): number;
    serialize(): Uint8Array;
}
